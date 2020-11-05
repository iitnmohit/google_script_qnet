import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CalenderSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.CALENDER;

    // public local variable

    // public abstract variable

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CALENDER, ThemeUtil.getCurrentTheme().CALENDER_SHEET);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CalenderSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === CalenderSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET.NAME);

        let newSchema = new CalenderSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET.NAME));
    }

    public static getValidCalenderSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CalenderSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET.NAME);
        return CalenderSheetSchema.getValidSchema(spreadsheet.getSheetByName(CalenderSheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}