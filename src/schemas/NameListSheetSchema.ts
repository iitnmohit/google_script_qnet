import { DefaultSchema } from "../constants/DefaultSchema";
import { SheetMessage } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";

export class NameListSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = DefaultSchema.NAMELIST.NAME;
    public static readonly SHEET_INDEX: number = DefaultSchema.NAMELIST.INDEX;

    public static readonly COL_SELECT: string = DefaultSchema.NAMELIST.COLUMN.SELECT;
    public static readonly COL_SL_NO: string = DefaultSchema.NAMELIST.COLUMN.SL_NO;
    public static readonly COL_NAME: string = DefaultSchema.NAMELIST.COLUMN.NAME;
    public static readonly COL_ADD_LOG: string = DefaultSchema.NAMELIST.COLUMN.ADD_LOG;
    public static readonly COL_UPDATED: string = DefaultSchema.NAMELIST.COLUMN.UPDATED;
    public static readonly COL_LIST: string = DefaultSchema.NAMELIST.COLUMN.LIST;
    public static readonly COL_LOCATION: string = DefaultSchema.NAMELIST.COLUMN.LOCATION;
    public static readonly COL_ZONE: string = DefaultSchema.NAMELIST.COLUMN.ZONE;
    public static readonly COL_CONNECT_UP: string = DefaultSchema.NAMELIST.COLUMN.CONNECT_UP;
    public static readonly COL_INFO: string = DefaultSchema.NAMELIST.COLUMN.INFO;
    public static readonly COL_EDIFY: string = DefaultSchema.NAMELIST.COLUMN.EDIFY;
    public static readonly COL_INVITE: string = DefaultSchema.NAMELIST.COLUMN.INVITE;
    public static readonly COL_PLAN: string = DefaultSchema.NAMELIST.COLUMN.PLAN;
    public static readonly COL_PLAN_DATE: string = DefaultSchema.NAMELIST.COLUMN.PLAN_DATE;
    public static readonly COL_CLOSING: string = DefaultSchema.NAMELIST.COLUMN.CLOSING;
    public static readonly COL_CAST: string = DefaultSchema.NAMELIST.COLUMN.CAST;
    public static readonly COL_UPDATED_ON: string = DefaultSchema.NAMELIST.COLUMN.UPDATED_ON;
    public static readonly COL_LINK: string = DefaultSchema.NAMELIST.COLUMN.LINK;
    public static readonly COL_TASK: string = DefaultSchema.NAMELIST.COLUMN.TASK;

    // public local variable
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

    // public abstract variable
    public NUM_OF_ROWS: number = DefaultSchema.NAMELIST.NUM_OF.ROWS;
    public NUM_OF_COLUMNS: number = DefaultSchema.NAMELIST.NUM_OF.COLUMNS;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;

    public FREEZE_ROW: number = DefaultSchema.NAMELIST.FREEZE.ROW;
    public FREEZE_COLUMN: number = DefaultSchema.NAMELIST.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, NameListSheetSchema.SHEET_NAME);
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            switch (firstRowRangeValues[0][i]) {
                case NameListSheetSchema.COL_SELECT: this.selectColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_SL_NO: this.slNoColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_NAME: this.nameColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_ADD_LOG: this.addLogColIndex = i + 1;
                    break;
                case NameListSheetSchema.COL_UPDATED: this.updateColIndex = i + 1;
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
                case NameListSheetSchema.COL_TASK: this.taskColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
    }

    // static method
    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): NameListSheetSchema {
        return new NameListSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): NameListSheetSchema {
        Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, NameListSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === NameListSheetSchema.SHEET_NAME,
            SheetMessage.INVALID_SHEET, NameListSheetSchema.SHEET_NAME);

        let newSchema = new NameListSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(SheetMessage.INVALID_SHEET, NameListSheetSchema.SHEET_NAME));
    }

    public static getValidNameListSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): NameListSheetSchema {
        Preconditions.checkNotNull(spreadsheet, SheetMessage.SHEET_NOT_FOUND, NameListSheetSchema.SHEET_NAME);
        return NameListSheetSchema.getValidSchema(spreadsheet.getSheetByName(NameListSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
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
        switch (index) {
            case this.selectColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.SELECT;
            case this.slNoColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.SL_NO;
            case this.nameColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.NAME;
            case this.addLogColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.ADD_LOG;
            case this.updateColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.UPDATED;
            case this.listColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.LIST;
            case this.locationColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.LOCATION;
            case this.zoneColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.ZONE;
            case this.connectUpColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.CONNECT_UP;
            case this.infoColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.INFO;
            case this.edifyColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.EDIFY;
            case this.inviteColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.INVITE;
            case this.planColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.PLAN;
            case this.planDateColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.PLAN_DATE;
            case this.closingColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.CLOSING;
            case this.castColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.CAST;
            case this.updateOnColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.UPDATED_ON;
            case this.linkColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.LINK;
            case this.taskColIndex: return DefaultSchema.NAMELIST.MIN_WIDTH.TASK;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.selectColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.SELECT;
            case this.slNoColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.SL_NO;
            case this.nameColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.NAME;
            case this.addLogColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.ADD_LOG;
            case this.updateColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.UPDATED;
            case this.listColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.LIST;
            case this.locationColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.LOCATION;
            case this.zoneColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.ZONE;
            case this.connectUpColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.CONNECT_UP;
            case this.infoColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.INFO;
            case this.edifyColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.EDIFY;
            case this.inviteColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.INVITE;
            case this.planColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.PLAN;
            case this.planDateColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.PLAN_DATE;
            case this.closingColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.CLOSING;
            case this.castColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.CAST;
            case this.updateOnColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.UPDATED_ON;
            case this.linkColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.LINK;
            case this.taskColIndex: return DefaultSchema.NAMELIST.MAX_WIDTH.TASK;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, SheetMessage.INVALID_SHEET, NameListSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.selectColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.slNoColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.nameColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.addLogColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.updateColIndex)) return false;
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
        if (Predicates.IS_NOT_POSITIVE.test(this.taskColIndex)) return false;
        this.isThisSchemaValid = true;
        return true;
    }
}