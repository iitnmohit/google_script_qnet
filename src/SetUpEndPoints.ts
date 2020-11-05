import { runSafely } from "./Code";
import { Msg } from "./constants/Message";
import { FormulaService } from "./service/setup/FormulaService";
import { SecurityService } from "./service/setup/SecurityService";
import { SetUpService } from "./service/setup/SetUpService";
import { ThemeService } from "./service/setup/ThemeService";
import { UiService } from "./service/UiService";
import { ValidationService } from "./service/setup/ValidationService";
import { ThemeUtil } from "./util/ThemeUtil";

function setUpSheet(): void {
    if (!UiService.doesUserReConfirmedAction(Msg.SETUP_CONFIRMATION_MSG)) {
        return;
    }
    runSafely((): void => {
        let setUpService = new SetUpService();
        let spreadsheet = setUpService.createAllSheets();
        setUpService.deleteNonQnetSheets();

        FormulaService.applyFormulaToAllSheets(spreadsheet);

        ValidationService.applyValidationToAllSheets(spreadsheet);

        new ThemeService(spreadsheet, ThemeUtil.getCurrentTheme()).setTheme();

        new SecurityService(spreadsheet).protectSpreadSheet();
    });
}