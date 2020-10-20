import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { IColumn, ILovSheet, ISheet } from "../interface/ISheet";
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

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = LovSheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, LovSheetSchema.SHEET.NAME);
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        this.NUM_OF_ROWS = sheet.getMaxRows();

        if (Predicates.IS_LIST_EMPTY.test(this.ISHEET.COLUMNS)) {
            return;
        }
        let firstRowValues = sheet.getRange(1, 1, 1, this.NUM_OF_COLUMNS).getDisplayValues()[0];
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            this.ISHEET.COLUMNS.find((column: IColumn) => {
                if (column.NAME === firstRowValues[i]) {
                    return true;
                }
                return false;
            }).INDEX = i + 1;
        }
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

    // public local methods

    // private local method
}