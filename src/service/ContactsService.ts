import { Predicates } from "../library/Predicates";
import { ContactsSheetSchema } from "../schemas/ContactsSheetSchema";
import { DateUtil } from "../util/DateUtil";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseService } from "./BaseService";
import { Sheets } from "../constants/Sheets";

export class ContactsService extends BaseService {
    private readonly contactSchema: ContactsSheetSchema;

    public constructor () {
        super();
        this.contactSchema = ContactsSheetSchema
            .getValidContactsSchema();
    }

    public readAllContacts(): void {
        this.clearSheet();
        let allContacts = ContactsApp.getContacts();
        this.fillContactsToSheet(allContacts);
    }

    public clearAllCheckbox(): void {
        this.contactSchema.SPREADSHEET.getRange(2, this.contactSchema.getColIndexByName(Sheets.COLUMN_NAME.DO),
            this.contactSchema.NUM_OF_ROWS - 1, 1).uncheck();
    }

    private fillContactsToSheet(allContacts: GoogleAppsScript.Contacts.Contact[]): void {
        let sortedContacts = allContacts.sort(this.contactsArraySortComprator);
        let values: Array<Array<any>> = [];
        let slNo = 1;
        for (let index = 0; index < sortedContacts.length; index++) {
            let contactEach = sortedContacts[index];
            let phoneField = contactEach.getPhones();
            if (Predicates.IS_LIST_EMPTY.test(phoneField)) {
            } else if (phoneField.length == 1) {
                let rowArray = new Array<any>();
                rowArray.push(slNo++);
                rowArray.push(contactEach.getFullName());
                rowArray.push(this.correctLabel(phoneField[0].getLabel()));
                rowArray.push(phoneField[0].getPhoneNumber());
                rowArray.push(DateUtil.format(contactEach.getLastUpdated()));
                values.push(rowArray);
            } else {
                let rowArray = new Array<any>();
                rowArray.push(slNo++);
                rowArray.push(contactEach.getFullName());
                rowArray.push(this.correctLabel(phoneField[0].getLabel()));
                rowArray.push(phoneField[0].getPhoneNumber());
                rowArray.push(DateUtil.format(contactEach.getLastUpdated()));
                values.push(rowArray);
                for (let indexPhoneField = 1; indexPhoneField < phoneField.length; indexPhoneField++) {
                    let rowArray = new Array<any>();
                    rowArray.push("");
                    rowArray.push("");
                    rowArray.push(this.correctLabel(phoneField[indexPhoneField].getLabel()));
                    rowArray.push(phoneField[indexPhoneField].getPhoneNumber());
                    rowArray.push("");
                    values.push(rowArray);
                }
            }
        }
        this.contactSchema.insertRows(values.length + this.contactSchema.ISHEET.NUM_OF.ROWS - this.contactSchema.NUM_OF_ROWS);
        this.contactSchema.setValues(2, 1, values);
    }

    private correctLabel(label: string | GoogleAppsScript.Contacts.Field | GoogleAppsScript.Contacts.ExtendedField): string {
        if (typeof label === "string") {
            return label;
        }
        if (label.toLocaleString().endsWith("_PHONE")) {
            return label.toLocaleString().substr(0, label.toLocaleString().length - 6);
        }
        return label.toLocaleString();
    }

    private contactsArraySortComprator(left: GoogleAppsScript.Contacts.Contact,
        right: GoogleAppsScript.Contacts.Contact): number {
        if (left.getLastUpdated().getTime() < right.getLastUpdated().getTime()) {
            return 1;
        } else {
            return -1;
        }
    }

    private clearSheet(): ContactsService {
        this.contactSchema.removeRow(2, this.contactSchema.NUM_OF_ROWS - this.contactSchema.ISHEET.NUM_OF.ROWS);
        this.contactSchema.SPREADSHEET
            .getRange(2, 1, this.contactSchema.NUM_OF_ROWS - 1, this.contactSchema.NUM_OF_COLUMNS)
            .clearContent()
            .setBackground(ThemeUtil.getCurrentTheme().CONTACTS_SHEET.FIRST_ROW_COLOR)
            .clearNote();
        this.contactSchema.SPREADSHEET.setRowHeights(1, this.contactSchema.NUM_OF_ROWS, ThemeUtil.getCurrentTheme().rowHeight);
        return this;
    }
}