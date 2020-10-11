import { runSafely } from "./Code";
import { FormulaService } from "./service/FormulaService";
import { SetUpService } from "./service/SetUpService";
import { ThemeService } from "./service/ThemeService";
import { UiService } from "./service/UiService";
import { ValidationService } from "./service/ValidationService";
import { ThemeUtil } from "./util/ThemeUtil";

function setUpSheet(): void {
    if (!UiService.doesUserReConfirmedAction(
        "This will delete all the data and cannot be undone.\nAre you sure to proceed?")) {
        return;
    }
    runSafely((): void => {
        let setUpService = new SetUpService();
        let spreadsheet = setUpService.createAllSheets();
        setUpService.deleteNonQnetSheets();

        let formulaService = new FormulaService(spreadsheet);
        formulaService.applyFormulaToAllSheets();

        let validationService = new ValidationService(spreadsheet);
        validationService.applyValidationToAllSheets();

        let themeService = new ThemeService(spreadsheet, ThemeUtil.getCurrentTheme());
        themeService.setTheme();
    });
}