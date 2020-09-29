export class MenuService {
    public addBusinessMenu(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        spreadSheet.addMenu(
            'Business', [{
                name: 'Add Tasks',
                functionName: 'taskAddAll'
            }, {
                name: 'Add Top 10 Tasks',
                functionName: 'taskAddTopTen'
            }, {
                name: 'Add 1 Task',
                functionName: 'taskAddOne'
            }, {
                name: 'Update Log From Selected Tasks',
                functionName: 'taskUpdateSelectedLog'
            }, {
                name: 'Update Log From 1 Tasks',
                functionName: 'taskUpdateOneLog'
            }, {
                name: 'Clear Task CheckBoxes',
                functionName: 'taskClearAllCheckBox'
            }, {
                name: 'Delete All Tasks',
                functionName: 'taskDeleteAll'
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