import { SetUpService } from "./service/SetUpService";
import { UiService } from "./service/UiService";

//to do
function setUpSheet(): void {
    
    if (!UiService.doesUserReConfirmedAction()) {
        return;
    }
    var setUpService = new SetUpService();

    Logger.log("create overview");
    // create Overview Sheet
    setUpService.createOverViewSheets();

    Logger.log("create namelist");
    //create NameList Sheet
    setUpService.createNameListSheets();

    Logger.log("create lov");
    //create List of value sheet
    setUpService.createLovSheets();

    Logger.log("create city");
    //create city sheet
    setUpService.createCitySheets();

    Logger.log("delete other");
    // delete other sheeets    
    setUpService.deleteNonQnetSheets();
    Logger.log("finish");


}