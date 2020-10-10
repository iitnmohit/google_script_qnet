const MAIN_MENU_NAME = "QNET";


export class UiService {
    private static readonly confirmMessage: string = "Confirm to proceed";

    public addBusinessMenu(): void {
        SpreadsheetApp.getUi()
            .createMenu(MAIN_MENU_NAME)
            .addSubMenu(this.getCreateMenu())
            .addSubMenu(this.getUpdateMenu())
            .addItem('Clear Do CheckBoxes', 'taskClearAllCheckBox')
            .addItem('Delete All Tasks', 'taskDeleteAll')
            .addSeparator()
            .addItem('Set Up Sheet', 'setUpSheet')
            //.addItem('Update Logs To Doc', 'updateLogToDoc')
            //.addSeparator()
            .addToUi();
    }

    public static showErrorMessage(message: string): void {
        SpreadsheetApp.getUi().alert(message);
    }

    public static doesUserReConfirmedAction(message: string = UiService.confirmMessage): boolean {
        let ui = SpreadsheetApp.getUi();
        let buttonClicked = ui.alert("Heads up!", message, ui.ButtonSet.YES_NO);
        if (buttonClicked === ui.Button.YES) {
            return true;
        }
        return false;
    }

    private getCreateMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Create")
            .addItem('1 Task', 'taskAddOne')
            .addItem('10 Tasks', 'taskAddTopTen')
            .addItem('50 Tasks', 'taskAddTop50');
    }

    private getUpdateMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Update")
            .addItem('1 Tasks', 'taskUpdateOneLog')
            .addItem('10 Tasks', 'taskUpdateSelectedLog')
            .addItem('1 Log', 'logUpdateOne')
            .addItem('10 Logs', 'logUpdateTen')
            .addItem('20 Logs', 'logUpdateTwenty');
    }
}