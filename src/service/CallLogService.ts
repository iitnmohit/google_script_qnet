import { Constant } from "../constants/Constant";
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

    public addSelectedLog(count: number = Constant.LOG_MAX_UPDATE_COUNT): void {
        Preconditions.checkPositive(count, Msg.LOG.UPDATE.COUNT);
        Preconditions.checkArgument(count <= Constant.LOG_MAX_UPDATE_COUNT, Msg.LOG.UPDATE.COUNT);

        this.operateOnSelectedRows(count, this.nameListSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: NameListSheetSchema,
                row: number) => {
                this.appendLog(schema, row);
                schema.SPREADSHEET
                    .getRange(row, schema.getColIndexByName(NameListSheetSchema.COL_UPDATED_ON)).setValue(DateUtil.format());
            });
    }

    private appendLog(nameListSchema: NameListSheetSchema, rowIndex: number): void {
        let sheet = nameListSchema.SPREADSHEET;
        let logCell = sheet.getRange(rowIndex, nameListSchema.getColIndexByName(NameListSheetSchema.COL_ADD_LOG));
        //read new logs
        let newLogs = logCell.getDisplayValue();
        Preconditions.checkNotBlank(newLogs, "No Log to update at row %s", rowIndex);
        newLogs = Util.formatLog(newLogs);

        let nameCell = sheet.getRange(rowIndex, nameListSchema.getColIndexByName(NameListSheetSchema.COL_NAME));
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