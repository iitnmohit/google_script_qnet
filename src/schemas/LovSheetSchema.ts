import { DefaultSchema } from "../constants/DefaultSchema";
import { SheetMessage } from "../constants/Message";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class LovSheetSchema extends BaseSheetSchema {
    // static variable
    public static readonly SHEET_NAME: string = DefaultSchema.LOV_SHEET_NAME;
    public static readonly SHEET_INDEX: number = DefaultSchema.LOV_SHEET_INDEX;

    public static readonly COL_LIST: string = DefaultSchema.LOV_SHEET_COL_LIST;
    public static readonly COL_CONNECT_UP: string = DefaultSchema.LOV_SHEET_COL_CONNECT_UP;
    public static readonly COL_INFO: string = DefaultSchema.LOV_SHEET_COL_INFO;
    public static readonly COL_EDIFY: string = DefaultSchema.LOV_SHEET_COL_EDIFY;
    public static readonly COL_INVITE: string = DefaultSchema.LOV_SHEET_COL_INVITE;
    public static readonly COL_PLAN: string = DefaultSchema.LOV_SHEET_COL_PLAN;
    public static readonly COL_CLOSING: string = DefaultSchema.LOV_SHEET_COL_CLOSING;
    public static readonly COL_ZONE: string = DefaultSchema.LOV_SHEET_COL_ZONE;
    public static readonly COL_CAST: string = DefaultSchema.LOV_SHEET_COL_CAST;

    // public local variable
    public readonly listColIndex: number = -1;
    public readonly connectUpColIndex: number = -1;
    public readonly infoColIndex: number = -1;
    public readonly edifyColIndex: number = -1;
    public readonly inviteColIndex: number = -1;
    public readonly planColIndex: number = -1;
    public readonly closingColIndex: number = -1;
    public readonly zoneColIndex: number = -1;
    public readonly castColIndex: number = -1;

    // public abstract variable
    public NUM_OF_ROWS: number = DefaultSchema.LOV_SHEET_NUM_OF_ROWS;
    public NUM_OF_COLUMNS: number = DefaultSchema.LOV_SHEET_NUM_OF_COLUMNS;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.currentSheet = Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, LovSheetSchema.SHEET_NAME);
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            switch (firstRowRangeValues[0][i]) {
                case LovSheetSchema.COL_LIST: this.listColIndex = i + 1;
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
    }

    // static method
    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): LovSheetSchema {
        return new LovSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): LovSheetSchema {
        Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, LovSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === LovSheetSchema.SHEET_NAME,
            SheetMessage.INVALID_SHEET, LovSheetSchema.SHEET_NAME);

        let newSchema = new LovSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(SheetMessage.INVALID_SHEET, LovSheetSchema.SHEET_NAME));
    }

    public static getValidLovSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): LovSheetSchema {
        Preconditions.checkNotNull(spreadsheet, SheetMessage.SHEET_NOT_FOUND, LovSheetSchema.SHEET_NAME);
        return LovSheetSchema.getValidSchema(spreadsheet.getSheetByName(LovSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
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
        switch (index) {
            case this.listColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_LIST;
            case this.connectUpColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_CONNECT_UP;
            case this.infoColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_INFO;
            case this.edifyColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_EDIFY;
            case this.inviteColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_INVITE;
            case this.planColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_PLAN;
            case this.closingColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_CLOSING;
            case this.zoneColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_ZONE;
            case this.castColIndex: return DefaultSchema.LOV_SHEET_MIN_WIDTH_COL_CAST;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.listColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_LIST;
            case this.connectUpColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_CONNECT_UP;
            case this.infoColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_INFO;
            case this.edifyColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_EDIFY;
            case this.inviteColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_INVITE;
            case this.planColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_PLAN;
            case this.closingColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_CLOSING;
            case this.zoneColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_ZONE;
            case this.castColIndex: return DefaultSchema.LOV_SHEET_MAX_WIDTH_COL_CAST;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, SheetMessage.INVALID_SHEET, LovSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.listColIndex)) return false;
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