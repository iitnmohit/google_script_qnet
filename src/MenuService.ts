export class MenuService {
    public addBusinessMenu(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        spreadSheet.addMenu(
            'Business', [{
                name: 'Add Tasks',
                functionName: 'taskAddAll'
            },{
                name: 'Add Top 10 Tasks',
                functionName: 'taskAddTopTen'
            }, {
                name: 'Update Log From Selected Tasks',
                functionName: 'taskUpdateSelectedLog'
            },{
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