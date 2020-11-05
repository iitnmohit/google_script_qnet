import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class NameListSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.NAMELIST;

    // public local variable

    // public abstract variable

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.NAMELIST, ThemeUtil.getCurrentTheme().NAME_LIST_SHEET);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === NameListSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET.NAME);

        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET.NAME));
    }

    public static getValidNameListSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): NameListSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
        return NameListSheetSchema.getValidSchema(spreadsheet.getSheetByName(NameListSheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}