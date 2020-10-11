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

function settingsFunction() {
    var htmlOutput = HtmlService
        .createHtmlOutput('<p>A change of speed, a change of style...</p>')
        .setTitle('My add-on');
    SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

