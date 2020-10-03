import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class NameListSheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "NAME LIST";
    public static readonly SHEET_INDEX: number = 2;

    //delete this
    public static readonly MSG_INVALID_NAME_CELL_FORMAT: string = "Name is not valid.";

    public static readonly COL_SELECT: string = "SELECT";
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

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;

    public DEFAULT_ROW_COUNT: number = 1000;
    public DEFAULT_COL_COUNT: number = 19;
    public FREEZE_COLUMN: number = 3;

    public readonly selectColIndex: number = -1;
    public readonly slNoColIndex: number = -1;
    public readonly nameColIndex: number = -1;
    public readonly addLogColIndex: number = -1;
    public readonly updateColIndex: number = -1;
    public readonly listColIndex: number = -1;
    public readonly locationColIndex: number = -1;
    public readonly zoneColIndex: number = -1;
    public readonly connectUpColIndex: number = -1;
    public readonly infoColIndex: number = -1;
    public readonly edifyColIndex: number = -1;
    public readonly inviteColIndex: number = -1;
    public readonly planColIndex: number = -1;
    public readonly planDateColIndex: number = -1;
    public readonly closingColIndex: number = -1;
    public readonly castColIndex: number = -1;
    public readonly updateOnColIndex: number = -1;
    public readonly linkColIndex: number = -1;
    public readonly taskColIndex: number = -1;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_SELECT) {
                this.selectColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_SL_NO) {
                this.slNoColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_NAME) {
                this.nameColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_ADD_LOG) {
                this.addLogColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_UPDATED) {
                this.updateColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_LIST) {
                this.listColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_LOCATION) {
                this.locationColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_ZONE) {
                this.zoneColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_CONNECT_UP) {
                this.connectUpColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_INFO) {
                this.infoColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_EDIFY) {
                this.edifyColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_INVITE) {
                this.inviteColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_PLAN) {
                this.planColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_PLAN_DATE) {
                this.planDateColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_CLOSING) {
                this.closingColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_CAST) {
                this.castColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_UPDATED_ON) {
                this.updateOnColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_LINK) {
                this.linkColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === NameListSheetSchema.COL_TASK) {
                this.taskColIndex = i + 1;
            }
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): NameListSheetSchema {
        return new NameListSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        if (null == sheet) {
            throw new Error(NameListSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_SHEET_EQ_NULL);
        }
        if (sheet.getName() !== NameListSheetSchema.SHEET_NAME) {
            throw new Error(NameListSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_INVALID_SHEET_NAME);
        }
        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(NameListSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_INVALID_SHEET);
    }

    public getSheetName(): string {
        return NameListSheetSchema.SHEET_NAME;
    }

    public getHeadderValues(): Array<string> {
        return [
            NameListSheetSchema.COL_SELECT,
            NameListSheetSchema.COL_SL_NO,
            NameListSheetSchema.COL_NAME,
            NameListSheetSchema.COL_ADD_LOG,
            NameListSheetSchema.COL_UPDATED,
            NameListSheetSchema.COL_LIST,
            NameListSheetSchema.COL_LOCATION,
            NameListSheetSchema.COL_ZONE,
            NameListSheetSchema.COL_CONNECT_UP,
            NameListSheetSchema.COL_INFO,
            NameListSheetSchema.COL_EDIFY,
            NameListSheetSchema.COL_INVITE,
            NameListSheetSchema.COL_PLAN,
            NameListSheetSchema.COL_PLAN_DATE,
            NameListSheetSchema.COL_CLOSING,
            NameListSheetSchema.COL_CAST,
            NameListSheetSchema.COL_UPDATED_ON,
            NameListSheetSchema.COL_LINK,
            NameListSheetSchema.COL_TASK
        ];
    }

    public getMinColWidth(index: number): number {
        if(index == null || index < 1){
            return null;
        }
        switch (index) {
            case this.nameColIndex: return 275;
            case this.listColIndex: return 170;
            case this.locationColIndex: return 155;
            case this.zoneColIndex: return 100;
            case this.connectUpColIndex: return 130;
            case this.infoColIndex: return 70;
            case this.edifyColIndex: return 130;
            case this.inviteColIndex: return 130;
            case this.planColIndex: return 170;
            case this.closingColIndex: return 200;
            case this.castColIndex: return 85;
            case this.linkColIndex: return 70;
            default: return null;
        }
    }
    public getMaxColWidth(index: number): number {
        if(index == null || index < 1){
            return null;
        }
        // switch (index) {
        //     case this.selectColIndex: return 30;
        //     default: return null;
        // }
        return null;
    }

    private isSchemaValid(): boolean {
        if (this.selectColIndex < 1) return false;
        if (this.slNoColIndex < 1) return false;
        if (this.nameColIndex < 1) return false;
        if (this.addLogColIndex < 1) return false;
        if (this.updateColIndex < 1) return false;
        if (this.listColIndex < 1) return false;
        if (this.locationColIndex < 1) return false;
        if (this.zoneColIndex < 1) return false;
        if (this.connectUpColIndex < 1) return false;
        if (this.infoColIndex < 1) return false;
        if (this.edifyColIndex < 1) return false;
        if (this.inviteColIndex < 1) return false;
        if (this.planColIndex < 1) return false;
        if (this.planDateColIndex < 1) return false;
        if (this.closingColIndex < 1) return false;
        if (this.castColIndex < 1) return false;
        if (this.updateOnColIndex < 1) return false;
        if (this.linkColIndex < 1) return false;
        if (this.taskColIndex < 1) return false;
        return true;
    }
}