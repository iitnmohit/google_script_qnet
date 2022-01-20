import { Preconditions } from "../library/Preconditions";

const MAIN_MENU_NAME = "QNET";


export class UiService {
    private static readonly confirmMessage: string = "Confirm to proceed";

    public addBusinessMenu(): void {
        SpreadsheetApp.getUi()
            .createMenu(MAIN_MENU_NAME)
            .addSubMenu(this.getCreateMenu())
            .addSubMenu(this.getUpdateMenu())
            .addSubMenu(this.getInviteMenu())
            .addSeparator()
            .addSubMenu(this.getCalenderMenu())
            .addItem('Delete Events', 'deleteSelectedCalenderEvents')
            .addSeparator()
            .addSubMenu(this.getContactMenu())
            .addSeparator()
            .addItem('Copy Last Log', 'copyLastLog')
            .addItem('Clear Do CheckBoxes', 'commonClearAllCheckBox')
            .addSubMenu(this.getSettingsMenu())
            .addToUi();
    }

    private getInviteMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Invite")
            .addItem('Invite 1', 'scheduleOneInvite')
            .addItem('Invite 5', 'scheduleFiveInvite');
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

    /**
     * 
     * @param message display message to input box
     * @returns response text or null if user press cancel
     */
    public static getInputFromUser(message: string, isRetry: boolean = false): string {
        let title = "Heads Up!";
        if (isRetry) {
            title = "* Below information is required to proceed";
        }
        Preconditions.checkNotBlank(message);
        let ui = SpreadsheetApp.getUi();
        let promptResponse = ui.prompt(title, message, ui.ButtonSet.OK_CANCEL);
        if (promptResponse.getSelectedButton() === ui.Button.OK) {
            return promptResponse.getResponseText();
        }
        return null;
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
            .addItem('From 1 Tasks', 'taskUpdateOneLog')
            .addItem('From 10 Tasks', 'taskUpdateSelectedLog')
            .addItem('From 50 Tasks', 'taskUpdateSelectedFiftyLog')
            .addSeparator()
            .addItem('1 Log', 'logUpdateOne')
            .addItem('10 Logs', 'logUpdateTen');
    }

    private getCalenderMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Calender")
            .addItem('Sync today', 'sync_todays_events')
            .addItem('Sync current week', 'sync_currentWeek_events')
            .addItem('Sync current(+/-1) week', 'sync_current_prev_next_Week_events')
            .addItem('Sync current month', 'sync_current_month_events')
            .addItem('Sync past 30 days', 'sync_before_30days_events')
            .addItem('Sync past 90 days', 'sync_before_90days_events');
    }

    private getContactMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Contacts")
            .addItem('Sync All', 'getAllContacts');
    }

    private getSettingsMenu(): GoogleAppsScript.Base.Menu {
        return SpreadsheetApp.getUi()
            .createMenu("Settings")
            .addItem('Set Up Sheet', 'setUpSheet')
            .addItem('Reset Meeting Link', 'resetMeetingLinkProperty')
            .addItem('Reset Invite Description', 'resetInviteMeetingDescription')
            .addItem('Reset log date', 'resetLogUpdateDate')
            .addItem('Delete All Tasks', 'taskDeleteAll');
    }
}
