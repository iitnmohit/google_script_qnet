import { UiService } from "./service/UiService";

export function runSafelyWithParam<T>(t: T, callback: (t: T) => void): void {
    try {
        callback(t);
    } catch (error: unknown) {
        handleError(error);
    }
}

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
        Logger.log("Error");
    }
    if (error instanceof Error) {
        uiService.showErrorMessage(error.message);
        Logger.log("Error" + error.message + error.stack);
    }
}

