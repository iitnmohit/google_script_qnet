import { SetUpService } from "./service/SetUpService";
import { ValidationService } from "./service/ValidationService";
import { ThemeService } from "./service/ThemeService";
import { UiService } from "./service/UiService";
import { FormulaService } from "./service/FormulaService";

function setUpSheet(): void {
    if (!UiService.doesUserReConfirmedAction(
        "This will delete all the data and cannot be undone.\nAre you sure to proceed?")) {
        return;
    }
    let setUpService = new SetUpService();
    let spreadsheet = setUpService.createAllSheets();
    setUpService.deleteNonQnetSheets();

    let formulaService = new FormulaService(spreadsheet);
    formulaService.applyFormulaToAllSheets();

    let validationService = new ValidationService(spreadsheet);
    validationService.applyValidationToAllSheets();

    let themeService = new ThemeService(spreadsheet);
    themeService.applyBasicTheme();
}