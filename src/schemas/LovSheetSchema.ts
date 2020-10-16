import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";

export class LovSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.LOV.NAME;
    public static readonly SHEET_INDEX: number = Sheets.LOV.INDEX;

    public static readonly COL_LIST: string = Sheets.LOV.COLUMN.LIST;
    public static readonly COL_STRIKE_THORUGH: string = Sheets.LOV.COLUMN.STRIKE_THROUGH;
    public static readonly COL_CONNECT_UP: string = Sheets.LOV.COLUMN.CONNECT_UP;
    public static readonly COL_INFO: string = Sheets.LOV.COLUMN.INFO;
    public static readonly COL_EDIFY: string = Sheets.LOV.COLUMN.EDIFY;
    public static readonly COL_INVITE: string = Sheets.LOV.COLUMN.INVITE;
    public static readonly COL_PLAN: string = Sheets.LOV.COLUMN.PLAN;
    public static readonly COL_CLOSING: string = Sheets.LOV.COLUMN.CLOSING;
    public static readonly COL_ZONE: string = Sheets.LOV.COLUMN.ZONE;
    public static readonly COL_CAST: string = Sheets.LOV.COLUMN.CAST;

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
    public ISHEET: ISheet = Sheets.LOV;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;

    public FREEZE_ROW: number = Sheets.LOV.FREEZE.ROW;
    public FREEZE_COLUMN: number = Sheets.LOV.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET_NAME);
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
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === LovSheetSchema.SHEET_NAME,
            Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET_NAME);

        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET_NAME));
    }

    public static getValidLovSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): LovSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET_NAME);
        return LovSheetSchema.getValidSchema(spreadsheet.getSheetByName(LovSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
    public getSheetName(): string {
        return LovSheetSchema.SHEET_NAME;
    }

    public getMinColWidth(index: number): number {
        switch (index) {
            case this.listColIndex: return Sheets.LOV.MIN_WIDTH.LIST;
            case this.strikeThroughColIndex: return Sheets.LOV.MIN_WIDTH.STRIKE_THROUGH;
            case this.connectUpColIndex: return Sheets.LOV.MIN_WIDTH.CONNECT_UP;
            case this.infoColIndex: return Sheets.LOV.MIN_WIDTH.INFO;
            case this.edifyColIndex: return Sheets.LOV.MIN_WIDTH.EDIFY;
            case this.inviteColIndex: return Sheets.LOV.MIN_WIDTH.INVITE;
            case this.planColIndex: return Sheets.LOV.MIN_WIDTH.PLAN;
            case this.closingColIndex: return Sheets.LOV.MIN_WIDTH.CLOSING;
            case this.zoneColIndex: return Sheets.LOV.MIN_WIDTH.ZONE;
            case this.castColIndex: return Sheets.LOV.MIN_WIDTH.CAST;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.listColIndex: return Sheets.LOV.MAX_WIDTH.LIST;
            case this.strikeThroughColIndex: return Sheets.LOV.MAX_WIDTH.STRIKE_THROUGH;
            case this.connectUpColIndex: return Sheets.LOV.MAX_WIDTH.CONNECT_UP;
            case this.infoColIndex: return Sheets.LOV.MAX_WIDTH.INFO;
            case this.edifyColIndex: return Sheets.LOV.MAX_WIDTH.EDIFY;
            case this.inviteColIndex: return Sheets.LOV.MAX_WIDTH.INVITE;
            case this.planColIndex: return Sheets.LOV.MAX_WIDTH.PLAN;
            case this.closingColIndex: return Sheets.LOV.MAX_WIDTH.CLOSING;
            case this.zoneColIndex: return Sheets.LOV.MAX_WIDTH.ZONE;
            case this.castColIndex: return Sheets.LOV.MAX_WIDTH.CAST;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, Msg.SHEET.INVALID_SHEET, LovSheetSchema.SHEET_NAME);
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
        this.isThisSchemaValid = true;
        return true;
    }
}