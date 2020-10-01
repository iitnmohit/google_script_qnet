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
    if (error instanceof Error) {
        UiService.showErrorMessage(error.message);
        Logger.log("Error" + error.message + error.stack);
    }
}

