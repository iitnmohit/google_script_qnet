import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class NameListSheetSchema extends BaseSheetSchema {
    public static readonly MSG_ERROR_SHEET_NOT_FOUND: string = "Name List sheet not found.";
    public static readonly MSG_ERROR_INVALID_SHEET: string = "Name List sheet is not valid.";
    public static readonly MSG_INVALID_NAME_CELL_FORMAT: string = "Name is not valid.";
    public static readonly MSG_INVALID_SHEET_NAME: string = "Name list sheet name is not valid.";

    public static readonly SHEET_NAME: string = "NAME LIST";
    public static readonly SHEET_INDEX: number = 2;

    public static readonly COL_SL_NO: string = "Sl No";
    public static readonly COL_NAME: string = "NAME";
    public static readonly COL_ADD_LOG: string = "ADD LOG";
    public static readonly COL_UPDATED: string = "UPDATED";
    public static readonly COL_LIST: string = "LIST";
    public static readonly COL_LOCATION: string = "LOCATION";
    public static readonly COL_ZONE: string = "ZONE";
    public static readonly COL_CONNECT_UP: string = "CONNECT UP";
    public static readonly COL_INFO: string = "INFO";
    public static readonly COL_EDIFY: string = "EDIFY";
    public static readonly COL_INVITE: string = "INVITE";
    public static readonly COL_PLAN: string = "PLAN";
    public static readonly COL_PLAN_DATE: string = "PLAN DATE";
    public static readonly COL_CLOSING: string = "CLOSING";
    public static readonly COL_CAST: string = "CAST";
    public static readonly COL_UPDATED_ON: string = "UPDATED ON";
    public static readonly COL_LINK: string = "LINK";
    public static readonly COL_TASK: string = "TASK";

    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;

    public DEFAULT_ROW_COUNT: number = 1000;
    public DEFAULT_COL_COUNT: number = 19;

    public readonly slNoColIndex: number = -1;
    public readonly nameColIndex: number = -1;
    public readonly addLogColIndex: number = -1;
    public readonly updateColIndex: number = -1;
    public readonly updateOnColIndex: number = -1;
    public readonly taskColIndex: number = -1;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
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
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_SL_NO) {
                this.slNoColIndex = i + 1;
            }
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): NameListSheetSchema {
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

    public getSheetName(): string {
        return NameListSheetSchema.SHEET_NAME;
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