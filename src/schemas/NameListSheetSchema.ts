import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { IColumn, ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class NameListSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.NAMELIST;

    public static readonly COL_SELECT: string = Sheets.COLUMN_NAME.SELECT;
    public static readonly COL_SL_NO: string = Sheets.COLUMN_NAME.SL_NO;
    public static readonly COL_NAME: string = Sheets.COLUMN_NAME.NAME;
    public static readonly COL_LIST: string = Sheets.COLUMN_NAME.LIST;
    public static readonly COL_LOCATION: string = Sheets.COLUMN_NAME.LOCATION;
    public static readonly COL_ZONE: string = Sheets.COLUMN_NAME.ZONE;
    public static readonly COL_CONNECT_UP: string = Sheets.COLUMN_NAME.CONNECT_UP;
    public static readonly COL_INFO: string = Sheets.COLUMN_NAME.INFO;
    public static readonly COL_EDIFY: string = Sheets.COLUMN_NAME.EDIFY;
    public static readonly COL_INVITE: string = Sheets.COLUMN_NAME.INVITE;
    public static readonly COL_PLAN: string = Sheets.COLUMN_NAME.PLAN;
    public static readonly COL_PLAN_DATE: string = Sheets.COLUMN_NAME.PLAN_DATE;
    public static readonly COL_CLOSING: string = Sheets.COLUMN_NAME.CLOSING;
    public static readonly COL_CAST: string = Sheets.COLUMN_NAME.CAST;
    public static readonly COL_UPDATED_ON: string = Sheets.COLUMN_NAME.UPDATED_ON;
    public static readonly COL_LINK: string = Sheets.COLUMN_NAME.LINK;
    public static readonly COL_ADD_LOG: string = Sheets.COLUMN_NAME.ADD_LOG;
    public static readonly COL_DO: string = Sheets.COLUMN_NAME.DO;

    // public local variable

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = NameListSheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().nameTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, NameListSheetSchema.SHEET.NAME);
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

    // public local methods

    // private local method
}