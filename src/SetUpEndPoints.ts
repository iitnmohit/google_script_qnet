import { SetUpService } from "./service/SetUpService";
import { SetUpValidationService } from "./service/SetUpValidationService";
import { ThemeService } from "./service/ThemeService";
import { UiService } from "./service/UiService";

function setUpSheet(): void {
    if (!UiService.doesUserReConfirmedAction(
        "This will delete all the data and cannot be undone.\nAre you sure to proceed?")) {
        return;
    }
    let setUpService = new SetUpService();
    let spreadsheet = setUpService.createAllSheets();
    setUpService.deleteNonQnetSheets();

    let validationService = new SetUpValidationService(spreadsheet);
    validationService.applyValidationToAllSheets();

    let themeService = new ThemeService(spreadsheet);
    // themeService.applyBasicTheme();
}