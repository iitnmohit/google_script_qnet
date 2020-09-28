export class MenuService {
    public addBusinessMenu(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        spreadSheet.addMenu(
            'Business', [{
                name: 'Clear Task CheckBoxes',
                functionName: 'taskClearAllCheckBox'
            }, {
                name: 'Delete All Tasks',
                functionName: 'taskDeleteAll'
            }, {
                name: 'Add Tasks',
                functionName: 'taskAddAll'
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