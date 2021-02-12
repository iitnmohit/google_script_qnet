import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class NameListSheetSchema extends BaseSchema {
    private static instance: NameListSheetSchema = null;
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.NAMELIST, ThemeUtil.getCurrentTheme().NAME_LIST_SHEET);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        if (Predicates.IS_NOT_NULL.test(NameListSheetSchema.instance)) {
            return NameListSheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.NAMELIST.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.NAMELIST.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.NAMELIST.NAME);

        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            NameListSheetSchema.instance = newSchema;
            return newSchema;
        }
        let unDefColName: string = newSchema.getUndefinedColumnName();
        throw new InvalidSheetException(Utilities
            .formatString(Msg.SHEET.INVALID_SHEET_COLUMN, Sheets.NAMELIST.NAME, unDefColName));
    }

    public static getValidNameListSchema(): NameListSheetSchema {
        if (Predicates.IS_NOT_NULL.test(NameListSheetSchema.instance)) {
            return NameListSheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.NAMELIST.NAME);
        return NameListSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.NAMELIST.NAME));
    }
}