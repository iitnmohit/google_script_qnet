export class Util {
    private static readonly monthArray: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    public static arrayOfArray<T>(array: Array<T>): Array<Array<T>> {
        return array.map((t): Array<T> => {
            return [t];
        });
    }

    public static formatUpdateLog(log: string, todayDate?: string): string {
        if (!(log != null && log.trim().length > 0)) {
            return "";
        }
        let formatedLog: string = "";
        let lines: string[] = log.split("\n");

        for (let i = 0; i < lines.length; i++) {
            let eachLine = lines[i].replace("•", "").replace("-", "").trim();
            if (eachLine.length == 0) {
                continue;
            }

            if (Util.isValidDate(eachLine)) {
                formatedLog = formatedLog + "\n\n" + Util.formatDate(eachLine);
                continue;
            }

            if (eachLine.toLocaleLowerCase() === "today") {
                if (Util.isValidDate(todayDate)) {
                    formatedLog = formatedLog + "\n\n" + Util.formatDate(todayDate);
                } else {
                    formatedLog = formatedLog + "\n\n" + Util.formatTodayDate();
                }
                continue;
            }

            formatedLog = formatedLog + "\n" + " • " + eachLine;
        }
        return formatedLog.trim();
    }

    public static isValidDate(date: string): boolean {
        let d = Date.parse(date);
        return !isNaN(d);
    }

    public static formatDate(date: string): string {
        let timestamp = Date.parse(date);
        if (!isNaN(timestamp)) {
            let dateObj = new Date(timestamp);
            return Util.dateString(dateObj);
        } else {
            return date;
        }
    }

    public static formatTodayDate(): string {
        let timestamp = Utilities.formatDate(new Date(), "GMT+5:30", "dd-MMM-yyyy");
        let date = new Date(timestamp);
        return Util.dateString(date);
    }

    public static getColumnA1Notation(colIndex: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number, sheetName: string): string;
    public static getColumnA1Notation(colIndex: number, beginRow?: number, sheetName?: string): string {
        if (colIndex == null || colIndex < 1) {
            throw new Error("col index invalid");
        }
        let colLetter = Util.getColumnLetter(colIndex);
        let beginRowNum = "";
        if (beginRow > 1) {
            beginRowNum += beginRow;
        }
        if (sheetName == null) {
            return `${colLetter}${beginRowNum}:${colLetter}`;
        } else {
            return `'${sheetName}'!${colLetter}${beginRowNum}:${colLetter}`;
        }
    }

    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range): string;
    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range, sheetName: string): string;
    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range, sheetName?: string): string {
        if (range == null) {
            throw new Error("Invalid Range");
        }
        if (sheetName == null) {
            return range.getA1Notation();
        } else {
            return sheetName + "!" + range.getA1Notation();
        }
    }

    public static getColumnLetter(index: number): string {
        switch (index) {
            case 1: return "A";
            case 2: return "B";
            case 3: return "C";
            case 4: return "D";
            case 5: return "E";
            case 6: return "F";
            case 7: return "G";
            case 8: return "H";
            case 9: return "I";
            case 10: return "J";
            case 11: return "K";
            case 12: return "L";
            case 13: return "M";
            case 14: return "N";
            case 15: return "O";
            case 16: return "P";
            case 17: return "Q";
            case 18: return "R";
            case 19: return "S";
            case 20: return "T";
            case 21: return "U";
            case 22: return "V";
            case 23: return "W";
            case 24: return "X";
            case 25: return "Y";
            case 26: return "Z";
            default: throw new Error("not implemented yet");
        }
    }

    private static dateString(dateObj: Date) {
        let month = Util.getMonthName(dateObj.getMonth());
        let day = String(dateObj.getDate());
        let year = String(dateObj.getFullYear());

        if (day.length < 2)
            day = '0' + day;

        return `${day}/${month}/${year}`;
    }

    private static getMonthName(number: number): string {
        if (null == number) {
            return "";
        }
        if (number < 0 || number > 11) {
            return "";
        }
        return Util.monthArray[number];
    }
}