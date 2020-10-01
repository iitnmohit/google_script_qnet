export class NameListSheetSchema {
    public static readonly MSG_ERROR_SHEET_NOT_FOUND = "Name List sheet not found.";
    public static readonly MSG_ERROR_INVALID_SHEET = "Name List sheet is not valid.";
    public static readonly MSG_INVALID_NAME_CELL_FORMAT = "Name is not valid.";
    public static readonly MSG_INVALID_SHEET_NAME = "Name list sheet name is not valid.";
    public static readonly SHEET_INDEX = 2;
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


    public readonly slNoColIndex: number = -1;
    public readonly nameColIndex: number = -1;
    public readonly addLogColIndex: number = -1;
    public readonly updateColIndex: number = -1;
    public readonly updateOnColIndex: number = -1;
    public readonly taskColIndex: number = -1;

    private constructor(private sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        let firstRowRangeValues = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues();
        for (let i = 0; i < sheet.getMaxColumns(); i++) {
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
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_Sl_No) {
                this.slNoColIndex = i + 1;
            }
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        if (null == sheet) {
            throw new Error(NameListSheetSchema.MSG_ERROR_SHEET_NOT_FOUND);
        }
        return new NameListSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        if (null == sheet) {
            throw new Error(NameListSheetSchema.MSG_ERROR_SHEET_NOT_FOUND);
        }
        if (sheet.getName() !== NameListSheetSchema.SHEET_NAME) {
            throw new Error(NameListSheetSchema.MSG_INVALID_SHEET_NAME);
        }
        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(NameListSheetSchema.MSG_ERROR_INVALID_SHEET);
    }

    private isSchemaValid(): boolean {
        if (this.slNoColIndex < 1) return false;
        if (this.nameColIndex < 1) return false;
        if (this.addLogColIndex < 1) return false;
        if (this.updateColIndex < 1) return false;
        if (this.updateOnColIndex < 1) return false;
        if (this.taskColIndex < 1) return false;
        return true;
    }
}