export class MenuService {
    public addBusinessMenu(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        spreadSheet.addMenu(
            'Business', [{
                name: 'Clear Task CheckBox',
                functionName: 'clearTaskCheckBox'
            }, {
                name: 'Delete All Tasks',
                functionName: 'deleteAllTasks'
            }, {
                name: 'Add Tasks',
                functionName: 'addTasks'
            }
        ]
        );

        // SpreadsheetApp.getUi()
        //     .createMenu('Business')
        //     .addItem('Clear Task CheckBox', 'clearTaskCheckBox')
        //     .addItem('Delete All Tasks', 'deleteAllTasks')
        //     .addItem('Add Tasks', 'addTasks')
        //     .addSeparator()
        //     .addToUi();
    }
}