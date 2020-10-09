import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ServerException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { Util } from "../util/Util";

export class CallLogService {
    public addLog(range: GoogleAppsScript.Spreadsheet.Range): void {
        Preconditions.checkNotNull(range);
        let sheet = range.getSheet();
        let nameListSchema = NameListSheetSchema.getValidSchema(sheet);

        // verify column edited
        if (range.getColumn() !== nameListSchema.updateColIndex) {
            return;
        }

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
        let sheet = nameListSchema.getCurrentSheet();
        let logCell = sheet.getRange(rowIndex, nameListSchema.addLogColIndex);
        //read new logs
        let newLogs = logCell.getDisplayValue();
        if (Predicates.IS_BLANK.test(newLogs)) {
            return;
        }
        newLogs = Util.formatUpdateLog(newLogs);

        let nameCell = sheet.getRange(rowIndex, nameListSchema.nameColIndex);
        //read old logs
        let oldLogs = nameCell.getNote().trim();
        if (Predicates.IS_NOT_BLANK.test(oldLogs)) {
            oldLogs = oldLogs + "\n\n";
        }

        //update LOG
        let updatedLog = oldLogs + Util.formatTodayDate() + "\n" + newLogs;
        nameCell.setNote(updatedLog);

        //clear log cell
        logCell.setValue(Sheets.VALUE_DISPLAY_AFTER_LOG_ADDED);
    }

    private clearContent(sheet: GoogleAppsScript.Spreadsheet.Sheet,
        rowIndex: number,
        colIndex: number): void {
        try {
            sheet.getRange(rowIndex, colIndex).clear({ contentsOnly: true });
        } catch (error) {
            throw new ServerException(Msg.SHEET.SERVER_ERROR);
        }
    }
}