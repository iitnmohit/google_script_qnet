import { Log } from "../constants/Log";
import { Msg } from "../constants/Message";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { DateUtil } from "../util/DateUtil";
import { Util } from "../util/Util";
import { BaseService } from "./BaseService";

export class CallLogService extends BaseService {
    private readonly nameListSchema: NameListSheetSchema;

    public constructor () {
        super();
        this.nameListSchema = NameListSheetSchema
            .getValidNameListSchema(SpreadsheetApp.getActiveSpreadsheet());
    }

    public addSelectedLog(count: number = Log.MAX_LOG_UPDATE): void {
        Preconditions.checkPositive(count, Msg.LOG.UPDATE.COUNT);
        Preconditions.checkArgument(count <= Log.MAX_LOG_UPDATE, Msg.LOG.UPDATE.COUNT);

        this.operateOnSelectedRows(count, this.nameListSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: NameListSheetSchema,
                row: number) => {
                this.appendLog(schema, row);
                schema.CURRENT_SHEET
                    .getRange(row, schema.updateOnColIndex).setValue(DateUtil.format());
            });
    }

    private appendLog(nameListSchema: NameListSheetSchema, rowIndex: number): void {
        let sheet = nameListSchema.CURRENT_SHEET;
        let logCell = sheet.getRange(rowIndex, nameListSchema.addLogColIndex);
        //read new logs
        let newLogs = logCell.getDisplayValue();
        Preconditions.checkNotBlank(newLogs, "No Log to update at row %s", rowIndex);
        newLogs = Util.formatUpdateLog(newLogs);

        let nameCell = sheet.getRange(rowIndex, nameListSchema.nameColIndex);
        Preconditions.checkNotBlank(nameCell.getDisplayValue(), "No name present at Name Cell at row %s", rowIndex);
        //read old logs
        let oldLogs = nameCell.getNote().trim();
        if (Predicates.IS_NOT_BLANK.test(oldLogs)) {
            oldLogs = oldLogs + "\n\n";
        }

        //update LOG
        let updatedLog = oldLogs + DateUtil.format() + "\n" + newLogs;
        nameCell.setNote(updatedLog);

        //clear log cell
        logCell.clearContent();
    }
}