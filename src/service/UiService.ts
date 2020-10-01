export class UiService {
    private static readonly confirmMessage:string = "Confirm to proceed";

    public addBusinessMenu(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        SpreadsheetApp.getUi()
            .createMenu('Business')
            .addItem('Add Top 50 Tasks', 'taskAddTop50')
            .addItem('Add Top 10 Tasks', 'taskAddTopTen')
            .addItem('Add 1 Task', 'taskAddOne')
            .addItem('Update Log From 10 Tasks', 'taskUpdateSelectedLog')
            .addItem('Update Log From 1 Tasks', 'taskUpdateOneLog')
            .addItem('Clear Task CheckBoxes', 'taskClearAllCheckBox')
            .addItem('Delete All Tasks', 'taskDeleteAll')
            .addSeparator()
            // .addItem('Set Up Sheet','setUpSheet')
            //.addItem('Update Logs To Doc', 'updateLogToDoc')
            //.addSeparator()
            .addToUi();
    }

    public static showErrorMessage(message: string):void{
        SpreadsheetApp.getUi().alert(message);
    } 

    public static doesUserReConfirmedAction(message:string = UiService.confirmMessage):boolean{
        let ui = SpreadsheetApp.getUi();
        let buttonClicked = ui.alert("Heads up!",message,ui.ButtonSet.YES_NO);
        if(buttonClicked === ui.Button.YES){
            return true;
        }
        return false;
    }
}