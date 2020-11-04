import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class LovSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.LOV;

    // public local variable

    // public abstract variable
    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.LOV);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): LovSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === LovSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET.NAME);

        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET.NAME));
    }

    public static getValidLovSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): LovSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        return LovSheetSchema.getValidSchema(spreadsheet.getSheetByName(LovSheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}