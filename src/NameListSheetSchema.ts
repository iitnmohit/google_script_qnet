export class NameListSheetSchema {
    public static readonly SHEET_NAME = "NAME LIST";
    public static readonly COL_Sl_No = "Sl No";
    public static readonly COL_NAME = "NAME";
    public static readonly COL_ADD_LOG = "ADD LOG";
    public static readonly COL_UPDATED = "UPDATED";
    public static readonly COL_LIST = "LIST";
    public static readonly COL_LOCATION = "LOCATION";
    public static readonly COL_ZONE = "ZONE";
    public static readonly COL_CONNECT_UP = "CONNECT UP";
    public static readonly COL_INFO = "INFO";
    public static readonly COL_EDIFY = "EDIFY";
    public static readonly COL_INVITE = "INVITE";
    public static readonly COL_PLAN = "PLAN";
    public static readonly COL_PLAN_DATE = "PLAN DATE";
    public static readonly COL_CLOSING = "CLOSING";
    public static readonly COL_CAST = "CAST";
    public static readonly COL_UPDATED_ON = "UPDATED ON";
    public static readonly COL_LINK = "LINK";
    public static readonly COL_TASK = "TASK";



    public nameColIndex: number = -1;
    public addLogColIndex: number = -1;
    public updateColIndex: number = -1;
    public updateOnColIndex: number = -1;
    public taskColIndex: number = -1;

    constructor(private sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        var firstRowRangeValues = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues();
        for (var i = 0; i < sheet.getMaxColumns(); i++) {
            if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_UPDATED_ON) {
                this.updateOnColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_NAME) {
                this.nameColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_ADD_LOG) {
                this.addLogColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_UPDATED) {
                this.updateColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_TASK) {
                this.taskColIndex = i + 1;
            }
        }
    }
}