import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CitySheetSchema extends BaseSchema {
    private static instance: CitySheetSchema = null;
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CITY, ThemeUtil.getCurrentTheme().CITY_SHEET);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        if (Predicates.IS_NOT_NULL.test(CitySheetSchema.instance)) {
            return CitySheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.CITY.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.CITY.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.CITY.NAME);

        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            CitySheetSchema.instance = newSchema;
            return newSchema;
        }
        let unDefColName: string = newSchema.getUndefinedColumnName();
        throw new InvalidSheetException(Utilities
            .formatString(Msg.SHEET.INVALID_SHEET_COLUMN, Sheets.CITY.NAME, unDefColName));
     }

    public static getValidCitySchema(): CitySheetSchema {
        if (Predicates.IS_NOT_NULL.test(CitySheetSchema.instance)) {
            return CitySheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.CITY.NAME);
        return CitySheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.CITY.NAME));
    }
}