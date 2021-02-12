import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CalenderSheetSchema extends BaseSchema {
    private static instance: CalenderSheetSchema = null;
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CALENDER, ThemeUtil.getCurrentTheme().CALENDER_SHEET);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CalenderSheetSchema {
        if (Predicates.IS_NOT_NULL.test(CalenderSheetSchema.instance)) {
            return CalenderSheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.CALENDER.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.CALENDER.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.CALENDER.NAME);

        let newSchema = new CalenderSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            CalenderSheetSchema.instance = newSchema;
            return newSchema;
        }
        let unDefColName: string = newSchema.getUndefinedColumnName();
        throw new InvalidSheetException(Utilities
            .formatString(Msg.SHEET.INVALID_SHEET_COLUMN, Sheets.CALENDER.NAME, unDefColName));
    }

    public static getValidCalenderSchema(): CalenderSheetSchema {
        if (Predicates.IS_NOT_NULL.test(CalenderSheetSchema.instance)) {
            return CalenderSheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.CALENDER.NAME);
        return CalenderSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.CALENDER.NAME));
    }
}