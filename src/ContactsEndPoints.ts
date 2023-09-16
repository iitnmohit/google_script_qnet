declare const exports: typeof import('./Code');
import { ContactsService } from "./service/ContactsService";

function getAllContacts(): void {
    exports.runSafely((): void => {
        new ContactsService().readAllContacts();
    });
}