import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class ContactsSheetSchema extends BaseSchema {
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CONTACTS, ThemeUtil.getCurrentTheme().CONTACTS_SHEET);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): ContactsSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.CONTACTS.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.CONTACTS.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.CONTACTS.NAME);

        let newSchema = new ContactsSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, Sheets.CONTACTS.NAME));
    }

    public static getValidContactsSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): ContactsSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.CONTACTS.NAME);
        return ContactsSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.CONTACTS.NAME));
    }
}