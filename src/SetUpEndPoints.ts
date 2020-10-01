import { SetUpService } from "./service/SetUpService";

//to do
function setUpSheet(): void {
    var setUpService = new SetUpService();
    
    //delete existing sheeets
    setUpService.deleteAllSheets();

    //create Overview Sheet

    //create NameList Sheet
    setUpService.createNameListSheets();

    //create List of value sheet

    //create city sheet



}