import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class LovSheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "Lists";
    public static readonly SHEET_INDEX: number = 3;

    public static readonly COL_LIST: string = "LIST";
    public static readonly COL_CONNECT_UP: string = "CONNECT UP";
    public static readonly COL_INFO: string = "INFO";
    public static readonly COL_EDIFY: string = "EDIFY";
    public static readonly COL_INVITE: string = "INVITE";
    public static readonly COL_PLAN: string = "PLAN";
    public static readonly COL_CLOSING: string = "CLOSING";
    public static readonly COL_ZONE: string = "ZONE";
    public static readonly COL_CAST: string = "CAST";

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;

    public DEFAULT_ROW_COUNT: number = 100;
    public DEFAULT_COL_COUNT: number = 9;

    public readonly listColIndex: number = -1;
    public readonly connectUpColIndex: number = -1;
    public readonly infoColIndex: number = -1;
    public readonly edifyColIndex: number = -1;
    public readonly inviteColIndex: number = -1;
    public readonly planColIndex: number = -1;
    public readonly closingColIndex: number = -1;
    public readonly zoneColIndex: number = -1;
    public readonly castColIndex: number = -1;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            if (firstRowRangeValues[0][i] === LovSheetSchema.COL_LIST) {
                this.listColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_CONNECT_UP) {
                this.connectUpColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_INFO) {
                this.infoColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_EDIFY) {
                this.edifyColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_INVITE) {
                this.inviteColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_PLAN) {
                this.planColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_CLOSING) {
                this.closingColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_ZONE) {
                this.zoneColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === LovSheetSchema.COL_CAST) {
                this.castColIndex = i + 1;
            }
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): LovSheetSchema {
        return new LovSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): LovSheetSchema {
        if (null == sheet) {
            throw new Error(LovSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_SHEET_EQ_NULL);
        }
        if (sheet.getName() !== LovSheetSchema.SHEET_NAME) {
            throw new Error(LovSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_INVALID_SHEET_NAME);
        }
        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(LovSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_INVALID_SHEET);
    }

    public getSheetName(): string {
        return LovSheetSchema.SHEET_NAME;
    }

    public getHeadderValues(): Array<string> {
        return [
            LovSheetSchema.COL_LIST,
            LovSheetSchema.COL_CONNECT_UP,
            LovSheetSchema.COL_INFO,
            LovSheetSchema.COL_EDIFY,
            LovSheetSchema.COL_INVITE,
            LovSheetSchema.COL_PLAN,
            LovSheetSchema.COL_CLOSING,
            LovSheetSchema.COL_ZONE,
            LovSheetSchema.COL_CAST
        ];
    }

    public getMinColWidth(index: number): number {
        return null;
    }
    public getMaxColWidth(index: number): number {
        return null;
    }

    private isSchemaValid(): boolean {
        if (this.listColIndex < 1) return false;
        if (this.connectUpColIndex < 1) return false;
        if (this.infoColIndex < 1) return false;
        if (this.edifyColIndex < 1) return false;
        if (this.inviteColIndex < 1) return false;
        if (this.planColIndex < 1) return false;
        if (this.closingColIndex < 1) return false;
        if (this.zoneColIndex < 1) return false;
        if (this.castColIndex < 1) return false;
        return true;
    }
}