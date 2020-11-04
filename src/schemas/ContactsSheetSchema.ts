import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class ContactsSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.CONTACTS;

    // public local variable

    // public abstract variable
    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().contactsTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().contactsTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().contactsTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().contactsTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CONTACTS);
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): ContactsSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, ContactsSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === ContactsSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, ContactsSheetSchema.SHEET.NAME);

        let newSchema = new ContactsSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, ContactsSheetSchema.SHEET.NAME));
    }

    public static getValidContactsSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): ContactsSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, ContactsSheetSchema.SHEET.NAME);
        return ContactsSheetSchema.getValidSchema(spreadsheet.getSheetByName(ContactsSheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}