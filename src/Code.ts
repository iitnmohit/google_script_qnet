import { CalenderService } from "./service/CalenderService";
import { ContactsService } from "./service/ContactsService";
import { TaskService } from "./service/TaskService";
import { UiService } from "./service/UiService";

export function runSafely(callback: () => void): void {
    try {
        callback();
    } catch (error: unknown) {
        handleError(error);
    }
}

function handleError(error: unknown) {
    if (typeof error === "string") {
        UiService.showErrorMessage(error);
        Logger.log(error);
    }
    let ee = error as Error;
    UiService.showErrorMessage(ee.message);
    Logger.log("Error" + ee.message + ee.stack);
}

function commonClearAllCheckBox(): void {
    runSafely((): void => {
        new TaskService().clearAllCheckbox();
        new CalenderService().clearAllCheckbox();
        new ContactsService().clearAllCheckbox();
    });
}