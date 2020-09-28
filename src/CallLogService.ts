import { NameListSheetSchema } from "./NameListSheetSchema";

export class CallLogService {

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

    public static formatLog(log: string): string {
        return log;
    }
}