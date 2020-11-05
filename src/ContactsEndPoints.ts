import { runSafely } from "./Code";
import { ContactsService } from "./service/ContactsService";

function getAllContacts(): void {
    runSafely((): void => {
        new ContactsService().readAllContacts();
    });
}