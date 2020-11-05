import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class LovSheetSchema extends BaseSchema {
    private static instance: LovSheetSchema = null;
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.LOV, ThemeUtil.getCurrentTheme().LOV_SHEET);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): LovSheetSchema {
        if (Predicates.IS_NOT_NULL.test(LovSheetSchema.instance)) {
            return LovSheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.LOV.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.LOV.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.LOV.NAME);

        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            LovSheetSchema.instance = newSchema;
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, Sheets.LOV.NAME));
    }

    public static getValidLovSchema(): LovSheetSchema {
        if (Predicates.IS_NOT_NULL.test(LovSheetSchema.instance)) {
            return LovSheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.LOV.NAME);
        return LovSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.LOV.NAME));
    }
}