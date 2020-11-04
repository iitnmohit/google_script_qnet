import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CitySheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.CITY;

    // public local variable

    // public abstract variable
    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CITY);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === CitySheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET.NAME);

        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET.NAME));
    }

    public static getValidCitySchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CitySheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
        return CitySheetSchema.getValidSchema(spreadsheet.getSheetByName(CitySheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}