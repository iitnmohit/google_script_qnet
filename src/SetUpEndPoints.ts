import { SetUpService } from "./service/SetUpService";

//to do
function setUpSheet(): void {
    var setUpService = new SetUpService();
    
    

    //create Overview Sheet
    setUpService.createOverViewSheets();

    //create NameList Sheet
    setUpService.createNameListSheets();

    //create List of value sheet
    setUpService.createLovSheets();

    //create city sheet
    setUpService.createCitySheets();

    //delete existing sheeets
    setUpService.deleteNonQnetSheets();



}