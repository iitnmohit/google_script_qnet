import { UiService } from "./service/UiService";

export function runSafely(callback: () => void): void {
    try {
        callback();
    } catch (error: unknown) {
        handleError(error);
    }
}

function handleError(error: unknown) {
    let uiService = new UiService();
    if (typeof error === "string") {
        uiService.showErrorMessage(error);
        Logger.log(error);
    }
    if (error instanceof Error) {
        uiService.showErrorMessage(error.message);
        Logger.log("Error" + error.message + error.stack);
    }
}

