import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { Util } from "../util/Util";

export class CallLogService {

    public addLog(range: GoogleAppsScript.Spreadsheet.Range): void {
        let sheet = range.getSheet();

        // verify column edited
        if (range.getColumn() != NameListSheetSchema.getCompormisedSchema(sheet).updateColIndex) {
            return;
        }

        let nameListSchema = NameListSheetSchema.getValidSchema(sheet);
        let rowIndex = range.getRow();
        if (range.isChecked()) {
            this.appendLog(nameListSchema, rowIndex);
            sheet.getRange(rowIndex, nameListSchema.updateOnColIndex).setValue(Util.formatTodayDate());
        } else {
            this.clearContent(sheet, rowIndex, nameListSchema.addLogColIndex);
            this.clearContent(sheet, rowIndex, nameListSchema.updateOnColIndex);
        }
    }

    private appendLog(nameListSchema: NameListSheetSchema, rowIndex: number): void {
        let logCell = nameListSchema.getCurrentSheet().getRange(rowIndex, nameListSchema.addLogColIndex);
        //read new logs
        let newLogs = logCell.getDisplayValue().trim();
        if (newLogs.length == 0) {
            return;
        }
        newLogs = Util.formatUpdateLog(newLogs);

        let nameCell = nameListSchema.getCurrentSheet().getRange(rowIndex, nameListSchema.nameColIndex);
        //read old logs
        let oldLogs = nameCell.getNote().trim();
        if (oldLogs.length > 0) {
            oldLogs = oldLogs + "\n\n";
        }

        //update LOG
        let updatedLog = oldLogs + Util.formatTodayDate() + "\n" + newLogs;
        nameCell.setNote(updatedLog);

        //clear log cell
        logCell.setValue("UPDATED!");
    }

    private clearContent(sheet: GoogleAppsScript.Spreadsheet.Sheet,
        rowIndex: number,
        colIndex: number): void {
        try {
            sheet.getRange(rowIndex, colIndex).clear({ contentsOnly: true });
        } catch (error) {
        }
    }
}