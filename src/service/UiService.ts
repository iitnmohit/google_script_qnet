const MAIN_MENU_NAME = "QNET";


export class UiService {
    private static readonly confirmMessage: string = "Confirm to proceed";

    public addBusinessMenu(): void {
        SpreadsheetApp.getUi()
            .createMenu(MAIN_MENU_NAME)
            .addSubMenu(this.getCreateMenu())
            .addSubMenu(this.getUpdateMenu())
            .addSubMenu(this.getDeleteMenu())
            .addSubMenu(this.getSyncMenu())
            .addItem('Clear Do CheckBoxes', 'taskClearAllCheckBox')
            .addSeparator()
            .addItem('Set Up Sheet', 'setUpSheet')
            .addToUi();
    }

    public static showErrorMessage(message: string): void {
        let ui = SpreadsheetApp.getUi();
        ui.alert("Error!", message, ui.ButtonSet.OK);
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
            .addSeparator()
            .addItem('1 Log', 'logUpdateOne')
            .addItem('10 Logs', 'logUpdateTen')
            .addItem('20 Logs', 'logUpdateTwenty');
    }

    private getDeleteMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Delete")
            .addItem('All Tasks', 'taskDeleteAll')
            .addSeparator()
            .addItem('50 Events', 'deleteSelectedCalenderEvents');
    }

    private getSyncMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Sync Events")
            .addItem('last 30 days', 'sync_before_30days_after_0days_events');
    }
}