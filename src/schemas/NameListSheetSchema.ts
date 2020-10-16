import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";

export class NameListSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.NAMELIST.NAME;
    public static readonly SHEET_INDEX: number = Sheets.NAMELIST.INDEX;

    public static readonly COL_SELECT: string = Sheets.NAMELIST.COLUMN.SELECT;
    public static readonly COL_SL_NO: string = Sheets.NAMELIST.COLUMN.SL_NO;
    public static readonly COL_NAME: string = Sheets.NAMELIST.COLUMN.NAME;
    public static readonly COL_LIST: string = Sheets.NAMELIST.COLUMN.LIST;
    public static readonly COL_LOCATION: string = Sheets.NAMELIST.COLUMN.LOCATION;
    public static readonly COL_ZONE: string = Sheets.NAMELIST.COLUMN.ZONE;
    public static readonly COL_CONNECT_UP: string = Sheets.NAMELIST.COLUMN.CONNECT_UP;
    public static readonly COL_INFO: string = Sheets.NAMELIST.COLUMN.INFO;
    public static readonly COL_EDIFY: string = Sheets.NAMELIST.COLUMN.EDIFY;
    public static readonly COL_INVITE: string = Sheets.NAMELIST.COLUMN.INVITE;
    public static readonly COL_PLAN: string = Sheets.NAMELIST.COLUMN.PLAN;
    public static readonly COL_PLAN_DATE: string = Sheets.NAMELIST.COLUMN.PLAN_DATE;
    public static readonly COL_CLOSING: string = Sheets.NAMELIST.COLUMN.CLOSING;
    public static readonly COL_CAST: string = Sheets.NAMELIST.COLUMN.CAST;
    public static readonly COL_UPDATED_ON: string = Sheets.NAMELIST.COLUMN.UPDATED_ON;
    public static readonly COL_LINK: string = Sheets.NAMELIST.COLUMN.LINK;
    public static readonly COL_ADD_LOG: string = Sheets.NAMELIST.COLUMN.ADD_LOG;
    public static readonly COL_DO: string = Sheets.NAMELIST.COLUMN.DO;

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
    public ISHEET: ISheet = Sheets.NAMELIST;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;

    public FREEZE_ROW: number = Sheets.NAMELIST.FREEZE.ROW;
    public FREEZE_COLUMN: number = Sheets.NAMELIST.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET_NAME);
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
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === NameListSheetSchema.SHEET_NAME,
            Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET_NAME);

        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET_NAME));
    }

    public static getValidNameListSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): NameListSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET_NAME);
        return NameListSheetSchema.getValidSchema(spreadsheet.getSheetByName(NameListSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
    public getSheetName(): string {
        return NameListSheetSchema.SHEET_NAME;
    }

    public getMinColWidth(index: number): number {
        switch (index) {
            case this.selectColIndex: return Sheets.NAMELIST.MIN_WIDTH.SELECT;
            case this.slNoColIndex: return Sheets.NAMELIST.MIN_WIDTH.SL_NO;
            case this.nameColIndex: return Sheets.NAMELIST.MIN_WIDTH.NAME;
            case this.listColIndex: return Sheets.NAMELIST.MIN_WIDTH.LIST;
            case this.locationColIndex: return Sheets.NAMELIST.MIN_WIDTH.LOCATION;
            case this.zoneColIndex: return Sheets.NAMELIST.MIN_WIDTH.ZONE;
            case this.connectUpColIndex: return Sheets.NAMELIST.MIN_WIDTH.CONNECT_UP;
            case this.infoColIndex: return Sheets.NAMELIST.MIN_WIDTH.INFO;
            case this.edifyColIndex: return Sheets.NAMELIST.MIN_WIDTH.EDIFY;
            case this.inviteColIndex: return Sheets.NAMELIST.MIN_WIDTH.INVITE;
            case this.planColIndex: return Sheets.NAMELIST.MIN_WIDTH.PLAN;
            case this.planDateColIndex: return Sheets.NAMELIST.MIN_WIDTH.PLAN_DATE;
            case this.closingColIndex: return Sheets.NAMELIST.MIN_WIDTH.CLOSING;
            case this.castColIndex: return Sheets.NAMELIST.MIN_WIDTH.CAST;
            case this.updateOnColIndex: return Sheets.NAMELIST.MIN_WIDTH.UPDATED_ON;
            case this.linkColIndex: return Sheets.NAMELIST.MIN_WIDTH.LINK;
            case this.addLogColIndex: return Sheets.NAMELIST.MIN_WIDTH.ADD_LOG;
            case this.doColIndex: return Sheets.NAMELIST.MIN_WIDTH.DO;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.selectColIndex: return Sheets.NAMELIST.MAX_WIDTH.SELECT;
            case this.slNoColIndex: return Sheets.NAMELIST.MAX_WIDTH.SL_NO;
            case this.nameColIndex: return Sheets.NAMELIST.MAX_WIDTH.NAME;
            case this.listColIndex: return Sheets.NAMELIST.MAX_WIDTH.LIST;
            case this.locationColIndex: return Sheets.NAMELIST.MAX_WIDTH.LOCATION;
            case this.zoneColIndex: return Sheets.NAMELIST.MAX_WIDTH.ZONE;
            case this.connectUpColIndex: return Sheets.NAMELIST.MAX_WIDTH.CONNECT_UP;
            case this.infoColIndex: return Sheets.NAMELIST.MAX_WIDTH.INFO;
            case this.edifyColIndex: return Sheets.NAMELIST.MAX_WIDTH.EDIFY;
            case this.inviteColIndex: return Sheets.NAMELIST.MAX_WIDTH.INVITE;
            case this.planColIndex: return Sheets.NAMELIST.MAX_WIDTH.PLAN;
            case this.planDateColIndex: return Sheets.NAMELIST.MAX_WIDTH.PLAN_DATE;
            case this.closingColIndex: return Sheets.NAMELIST.MAX_WIDTH.CLOSING;
            case this.castColIndex: return Sheets.NAMELIST.MAX_WIDTH.CAST;
            case this.updateOnColIndex: return Sheets.NAMELIST.MAX_WIDTH.UPDATED_ON;
            case this.linkColIndex: return Sheets.NAMELIST.MAX_WIDTH.LINK;
            case this.addLogColIndex: return Sheets.NAMELIST.MAX_WIDTH.ADD_LOG;
            case this.doColIndex: return Sheets.NAMELIST.MAX_WIDTH.DO;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, Msg.SHEET.INVALID_SHEET, NameListSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    public insertRows(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.currentSheet.insertRows(this.NUM_OF_ROWS, howMany);
        this.NUM_OF_ROWS += howMany;
    }

    public insertsColumns(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.currentSheet.insertColumns(this.NUM_OF_COLUMNS, howMany);
        this.NUM_OF_COLUMNS += howMany;
    }

    public removeRow(index: number): void {
        if (index < 1) {
            return;
        }
        this.currentSheet.deleteRow(index);
        this.NUM_OF_ROWS--;
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
        this.isThisSchemaValid = true;
        return true;
    }
}