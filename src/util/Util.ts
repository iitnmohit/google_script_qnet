export class Util {
    private static readonly monthArray: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

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