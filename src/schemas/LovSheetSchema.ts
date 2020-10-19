import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ILovSheet, ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class LovSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ILovSheet = Sheets.LOV;

    public static readonly COL_LIST: string = LovSheetSchema.SHEET.COLUMN.LIST;
    public static readonly COL_STRIKE_THORUGH: string = LovSheetSchema.SHEET.COLUMN.STRIKE_THROUGH;
    public static readonly COL_CONNECT_UP: string = LovSheetSchema.SHEET.COLUMN.CONNECT_UP;
    public static readonly COL_INFO: string = LovSheetSchema.SHEET.COLUMN.INFO;
    public static readonly COL_EDIFY: string = LovSheetSchema.SHEET.COLUMN.EDIFY;
    public static readonly COL_INVITE: string = LovSheetSchema.SHEET.COLUMN.INVITE;
    public static readonly COL_PLAN: string = LovSheetSchema.SHEET.COLUMN.PLAN;
    public static readonly COL_CLOSING: string = LovSheetSchema.SHEET.COLUMN.CLOSING;
    public static readonly COL_ZONE: string = LovSheetSchema.SHEET.COLUMN.ZONE;
    public static readonly COL_CAST: string = LovSheetSchema.SHEET.COLUMN.CAST;

    // public local variable
    public readonly listColIndex: number = -1;
    public readonly strikeThroughColIndex: number = -1;
    public readonly connectUpColIndex: number = -1;
    public readonly infoColIndex: number = -1;
    public readonly edifyColIndex: number = -1;
    public readonly inviteColIndex: number = -1;
    public readonly planColIndex: number = -1;
    public readonly closingColIndex: number = -1;
    public readonly zoneColIndex: number = -1;
    public readonly castColIndex: number = -1;

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = LovSheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;

    public FREEZE_ROW: number = LovSheetSchema.SHEET.FREEZE.ROW;
    public FREEZE_COLUMN: number = LovSheetSchema.SHEET.FREEZE.COLUMN;

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getSheetValues(1, 1, 1, this.NUM_OF_COLUMNS);
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            switch (firstRowRangeValues[0][i]) {
                case LovSheetSchema.COL_LIST: this.listColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_STRIKE_THORUGH: this.strikeThroughColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_CONNECT_UP: this.connectUpColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_INFO: this.infoColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_EDIFY: this.edifyColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_INVITE: this.inviteColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_PLAN: this.planColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_CLOSING: this.closingColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_ZONE: this.zoneColIndex = i + 1;
                    break;
                case LovSheetSchema.COL_CAST: this.castColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
        this.NUM_OF_ROWS = sheet.getMaxRows();
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): LovSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === LovSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET.NAME);

        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET.NAME));
    }

    public static getValidLovSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): LovSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        return LovSheetSchema.getValidSchema(spreadsheet.getSheetByName(LovSheetSchema.SHEET.NAME));
    }

    // public abstract methods 
    public getMinColWidth(index: number): number {
        switch (index) {
            case this.listColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.LIST;
            case this.strikeThroughColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.STRIKE_THROUGH;
            case this.connectUpColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.CONNECT_UP;
            case this.infoColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.INFO;
            case this.edifyColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.EDIFY;
            case this.inviteColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.INVITE;
            case this.planColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.PLAN;
            case this.closingColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.CLOSING;
            case this.zoneColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.ZONE;
            case this.castColIndex: return LovSheetSchema.SHEET.MIN_WIDTH.CAST;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.listColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.LIST;
            case this.strikeThroughColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.STRIKE_THROUGH;
            case this.connectUpColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.CONNECT_UP;
            case this.infoColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.INFO;
            case this.edifyColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.EDIFY;
            case this.inviteColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.INVITE;
            case this.planColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.PLAN;
            case this.closingColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.CLOSING;
            case this.zoneColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.ZONE;
            case this.castColIndex: return LovSheetSchema.SHEET.MAX_WIDTH.CAST;
            default: return null;
        }
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.listColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.strikeThroughColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.connectUpColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.infoColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.edifyColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.inviteColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.planColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.closingColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.zoneColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.castColIndex)) return false;
        return true;
    }
}