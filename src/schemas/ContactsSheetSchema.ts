import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class ContactsSheetSchema extends BaseSchema {
    private static instance: ContactsSheetSchema = null;
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.CONTACTS, ThemeUtil.getCurrentTheme().CONTACTS_SHEET);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): ContactsSheetSchema {
        if (Predicates.IS_NOT_NULL.test(ContactsSheetSchema.instance)) {
            return ContactsSheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.CONTACTS.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.CONTACTS.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.CONTACTS.NAME);

        let newSchema = new ContactsSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            ContactsSheetSchema.instance = newSchema;
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, Sheets.CONTACTS.NAME));
    }

    public static getValidContactsSchema(): ContactsSheetSchema {
        if (Predicates.IS_NOT_NULL.test(ContactsSheetSchema.instance)) {
            return ContactsSheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.CONTACTS.NAME);
        return ContactsSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.CONTACTS.NAME));
    }
}