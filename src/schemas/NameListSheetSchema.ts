import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { INameListSheet, ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class NameListSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: INameListSheet = Sheets.NAMELIST;

    public static readonly COL_SELECT: string = NameListSheetSchema.SHEET.COLUMN.SELECT;
    public static readonly COL_SL_NO: string = NameListSheetSchema.SHEET.COLUMN.SL_NO;
    public static readonly COL_NAME: string = NameListSheetSchema.SHEET.COLUMN.NAME;
    public static readonly COL_LIST: string = NameListSheetSchema.SHEET.COLUMN.LIST;
    public static readonly COL_LOCATION: string = NameListSheetSchema.SHEET.COLUMN.LOCATION;
    public static readonly COL_ZONE: string = NameListSheetSchema.SHEET.COLUMN.ZONE;
    public static readonly COL_CONNECT_UP: string = NameListSheetSchema.SHEET.COLUMN.CONNECT_UP;
    public static readonly COL_INFO: string = NameListSheetSchema.SHEET.COLUMN.INFO;
    public static readonly COL_EDIFY: string = NameListSheetSchema.SHEET.COLUMN.EDIFY;
    public static readonly COL_INVITE: string = NameListSheetSchema.SHEET.COLUMN.INVITE;
    public static readonly COL_PLAN: string = NameListSheetSchema.SHEET.COLUMN.PLAN;
    public static readonly COL_PLAN_DATE: string = NameListSheetSchema.SHEET.COLUMN.PLAN_DATE;
    public static readonly COL_CLOSING: string = NameListSheetSchema.SHEET.COLUMN.CLOSING;
    public static readonly COL_CAST: string = NameListSheetSchema.SHEET.COLUMN.CAST;
    public static readonly COL_UPDATED_ON: string = NameListSheetSchema.SHEET.COLUMN.UPDATED_ON;
    public static readonly COL_LINK: string = NameListSheetSchema.SHEET.COLUMN.LINK;
    public static readonly COL_ADD_LOG: string = NameListSheetSchema.SHEET.COLUMN.ADD_LOG;
    public static readonly COL_DO: string = NameListSheetSchema.SHEET.COLUMN.DO;

    // public local variable
    public readonly selectColIndex: number = -1;
    public readonly slNoColIndex: number = -1;
    public readonly nameColIndex: number = -1;
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
    public readonly addLogColIndex: number = -1;
    public readonly doColIndex: number = -1;

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = NameListSheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;

    public FREEZE_ROW: number = NameListSheetSchema.SHEET.FREEZE.ROW;
    public FREEZE_COLUMN: number = NameListSheetSchema.SHEET.FREEZE.COLUMN;

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getSheetValues(1, 1, 1, this.NUM_OF_COLUMNS);
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            switch (firstRowRangeValues[0][i]) {
                case NameListSheetSchema.COL_SELECT: this.selectColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_SL_NO: this.slNoColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_NAME: this.nameColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_LIST: this.listColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_LOCATION: this.locationColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_ZONE: this.zoneColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_CONNECT_UP: this.connectUpColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_INFO: this.infoColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_EDIFY: this.edifyColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_INVITE: this.inviteColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_PLAN: this.planColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_PLAN_DATE: this.planDateColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_CLOSING: this.closingColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_CAST: this.castColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_UPDATED_ON: this.updateOnColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_LINK: this.linkColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_ADD_LOG: this.addLogColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_DO: this.doColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
        this.NUM_OF_ROWS = sheet.getMaxRows();
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === NameListSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET.NAME);

        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET.NAME));
    }

    public static getValidNameListSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): NameListSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
        return NameListSheetSchema.getValidSchema(spreadsheet.getSheetByName(NameListSheetSchema.SHEET.NAME));
    }

    // public abstract methods 
    public getMinColWidth(index: number): number {
        switch (index) {
            case this.selectColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.SELECT;
            case this.slNoColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.SL_NO;
            case this.nameColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.NAME;
            case this.listColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.LIST;
            case this.locationColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.LOCATION;
            case this.zoneColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.ZONE;
            case this.connectUpColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.CONNECT_UP;
            case this.infoColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.INFO;
            case this.edifyColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.EDIFY;
            case this.inviteColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.INVITE;
            case this.planColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.PLAN;
            case this.planDateColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.PLAN_DATE;
            case this.closingColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.CLOSING;
            case this.castColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.CAST;
            case this.updateOnColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.UPDATED_ON;
            case this.linkColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.LINK;
            case this.addLogColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.ADD_LOG;
            case this.doColIndex: return NameListSheetSchema.SHEET.MIN_WIDTH.DO;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.selectColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.SELECT;
            case this.slNoColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.SL_NO;
            case this.nameColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.NAME;
            case this.listColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.LIST;
            case this.locationColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.LOCATION;
            case this.zoneColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.ZONE;
            case this.connectUpColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.CONNECT_UP;
            case this.infoColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.INFO;
            case this.edifyColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.EDIFY;
            case this.inviteColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.INVITE;
            case this.planColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.PLAN;
            case this.planDateColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.PLAN_DATE;
            case this.closingColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.CLOSING;
            case this.castColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.CAST;
            case this.updateOnColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.UPDATED_ON;
            case this.linkColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.LINK;
            case this.addLogColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.ADD_LOG;
            case this.doColIndex: return NameListSheetSchema.SHEET.MAX_WIDTH.DO;
            default: return null;
        }
    }

    // public local methods
    public getColIndexByName(colName: string): number {
        switch (colName.toLocaleUpperCase()) {
            case NameListSheetSchema.COL_SELECT: return this.selectColIndex;
            case NameListSheetSchema.COL_SL_NO: return this.slNoColIndex;
            case NameListSheetSchema.COL_NAME: return this.nameColIndex;
            case NameListSheetSchema.COL_LIST: return this.listColIndex;
            case NameListSheetSchema.COL_LOCATION: return this.locationColIndex;
            case NameListSheetSchema.COL_ZONE: return this.zoneColIndex;
            case NameListSheetSchema.COL_CONNECT_UP: return this.connectUpColIndex;
            case NameListSheetSchema.COL_INFO: return this.infoColIndex;
            case NameListSheetSchema.COL_EDIFY: return this.edifyColIndex;
            case NameListSheetSchema.COL_INVITE: return this.inviteColIndex;
            case NameListSheetSchema.COL_PLAN: return this.planColIndex;
            case NameListSheetSchema.COL_PLAN_DATE: return this.planDateColIndex;
            case NameListSheetSchema.COL_CLOSING: return this.closingColIndex;
            case NameListSheetSchema.COL_CAST: return this.castColIndex;
            case NameListSheetSchema.COL_UPDATED_ON: return this.updateOnColIndex;
            case NameListSheetSchema.COL_LINK: return this.linkColIndex;
            case NameListSheetSchema.COL_ADD_LOG: return this.addLogColIndex;
            case NameListSheetSchema.COL_DO: return this.doColIndex;
            default: return null;
        }
    }

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.selectColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.slNoColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.nameColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.listColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.locationColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.zoneColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.connectUpColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.infoColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.edifyColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.inviteColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.planColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.planDateColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.closingColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.castColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.updateOnColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.linkColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.addLogColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.doColIndex)) return false;
        return true;
    }
}