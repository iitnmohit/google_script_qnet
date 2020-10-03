import { SetUpService } from "./service/SetUpService";
import { UiService } from "./service/UiService";

function setUpSheet(): void {
    if (!UiService.doesUserReConfirmedAction(
        "This will delete all the data and cannot be undone.\nAre you sure to proceed?")) {
        return;
    }
    var setUpService = new SetUpService();
    var spreadsheet = setUpService.createAllSheets();
    setUpService.deleteNonQnetSheets();
}