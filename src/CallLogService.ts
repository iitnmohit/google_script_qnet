import { NameListSheetSchema } from "./NameListSheetSchema";

export class CallLogService {
    private static readonly monthArray: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    public addLog(range: GoogleAppsScript.Spreadsheet.Range): void {
        let sheet = range.getSheet();
        let nameListSchema = new NameListSheetSchema(sheet);

        // Verify sheet name
        if (!(sheet.getName() === NameListSheetSchema.SHEET_NAME)) {
            return;
        }

        // verify column edited
        if (range.getColumn() != nameListSchema.updateColIndex) {
            return;
        }

        let rowIndex = range.getRow();

        if (range.isChecked()) {
            this.setUpdatedOnDate(sheet, rowIndex, nameListSchema.updateOnColIndex);
            this.appendLog(nameListSchema, sheet, rowIndex);
        } else {
            this.clearContent(sheet, rowIndex, nameListSchema.updateOnColIndex);
            this.clearContent(sheet, rowIndex, nameListSchema.addLogColIndex);
        }
    }

    private appendLog(nameListSchema: NameListSheetSchema,
        sheet: GoogleAppsScript.Spreadsheet.Sheet,
        rowIndex: number): void {

        if (nameListSchema.nameColIndex < 1 || nameListSchema.addLogColIndex < 1) {
            return;
        }

        //read old logs
        let oldNote = sheet.getRange(rowIndex, nameListSchema.nameColIndex).getNote().trim();
        if (oldNote.length > 0) {
            oldNote = oldNote + "\n\n";
        }

        //read new logs
        let newNote = sheet.getRange(rowIndex, nameListSchema.addLogColIndex).getValue().trim();
        if (newNote.length == 0) {
            return;
        }

        //update note
        let updatedNote = oldNote + Utilities.formatDate(new Date(), "GMT+5:30", "dd-MMM-yyyy") + "\n" + newNote;
        sheet.getRange(rowIndex, nameListSchema.nameColIndex).setNote(updatedNote);

        //clear log cell
        sheet.getRange(rowIndex, nameListSchema.addLogColIndex).setValue("UPDATED!");
    }

    private clearContent(sheet: GoogleAppsScript.Spreadsheet.Sheet,
        rowIndex: number,
        colIndex: number): void {
        if (rowIndex < 1 || colIndex < 1) {
            return;
        }
        sheet.getRange(rowIndex, colIndex).clear({ contentsOnly: true });
    }

    private setUpdatedOnDate(sheet: GoogleAppsScript.Spreadsheet.Sheet,
        rowIndex: number,
        colIndex: number): void {
        if (rowIndex < 1 || colIndex < 1) {
            return;
        }
        sheet.getRange(rowIndex, colIndex).setValue(new Date());
    }

    public static formatUpdateLog(log: string, dateCompleted: string): string {
        if (!(log != null && log.trim().length > 0)) {
            return "";
        }
        let formatedLog: string = "";
        let lines: string[] = log.split("\n");


        for (let i = 0; i < lines.length; i++) {
            let eachLine = lines[i].replace("•", "").trim();
            eachLine = eachLine.replace("-", "").trim();

            if (eachLine.length == 0) {
                continue;
            }

            if (CallLogService.isValidDate(eachLine)) {
                formatedLog = formatedLog + "\n\n" + CallLogService.formatDate(eachLine);
                continue
            }

            if (eachLine.toLocaleLowerCase() === "today") {
                if (CallLogService.isValidDate(dateCompleted)) {
                    formatedLog = formatedLog + "\n\n" + CallLogService.formatDate(dateCompleted);
                } else {
                    formatedLog = formatedLog + "\n\n" + CallLogService.formatTodayDate();
                }
                continue;
            }

            formatedLog = formatedLog + "\n" + " • " + eachLine;
        }
        return formatedLog.trim();
    }

    public static formatLog(log: string): string {
        if (!(log != null && log.trim().length > 0)) {
            return "";
        }
        let formatedLog: string = "";
        let lines: string[] = log.split("\n");


        for (let i = 0; i < lines.length; i++) {
            let eachLine = lines[i].replace("•", "").trim();
            eachLine = eachLine.replace("-", "").trim();

            if (eachLine.length == 0) {
                continue;
            }

            if (CallLogService.isValidDate(eachLine)) {
                formatedLog = formatedLog + "\n\n" + CallLogService.formatDate(eachLine);
                continue
            }

            formatedLog = formatedLog + "\n" + " - " + eachLine;
        }
        return formatedLog.trim();
    }

    private static formatTodayDate(): string {
        let dateObj = new Date();
        return CallLogService.dateString(dateObj);
    }

    private static formatDate(date: string): string {
        let timestamp = Date.parse(date);
        if (isNaN(timestamp) == false) {
            let dateObj = new Date(timestamp);
            return CallLogService.dateString(dateObj);
        } else {
            return date;
        }
    }

    private static dateString(dateObj: Date) {
        let month = CallLogService.getMonthName(dateObj.getMonth());
        let day = String(dateObj.getDate());
        let year = String(dateObj.getFullYear());

        if (day.length < 2)
            day = '0' + day;

        return `${day}/${month}/${year}`;
    }

    private static isValidDate(date: string): boolean {
        let d = Date.parse(date);
        return !isNaN(d);
    }

    private static getMonthName(number: number): string {
        if (null == number) {
            return "";
        }
        if (number < 0 || number > 11) {
            return "";
        }
        return CallLogService.monthArray[number];
    }

}