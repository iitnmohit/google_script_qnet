import { runSafely } from "./Code";
import { Msg } from "./constants/Message";
import { FormulaService } from "./service/FormulaService";
import { SecurityService } from "./service/SecurityService";
import { SetUpService } from "./service/SetUpService";
import { ThemeService } from "./service/ThemeService";
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

        new FormulaService(spreadsheet).applyFormulaToAllSheets();

        ValidationService.applyValidationToAllSheets(spreadsheet);

        new ThemeService(spreadsheet, ThemeUtil.getCurrentTheme()).setTheme();

        new SecurityService(spreadsheet).protectSpreadSheet();
    });
}