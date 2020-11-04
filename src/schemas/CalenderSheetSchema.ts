import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { IColumn, ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CalenderSheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ISheet = Sheets.CALENDER;

    public static readonly COL_DO: string = Sheets.COLUMN_NAME.DO;
    public static readonly COL_CALENDER: string = Sheets.COLUMN_NAME.CALENDER;
    public static readonly COL_TITLE: string = Sheets.COLUMN_NAME.TITLE;
    public static readonly COL_DESCRIPTION: string = Sheets.COLUMN_NAME.DESCRIPTION;
    public static readonly COL_ALL_DAY: string = Sheets.COLUMN_NAME.ALL_DAY;
    public static readonly COL_START_TIME: string = Sheets.COLUMN_NAME.START_TIME;
    public static readonly COL_END_TIME: string = Sheets.COLUMN_NAME.END_TIME;

    // public local variable

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = CalenderSheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET.NAME);
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
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CalenderSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === CalenderSheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET.NAME);

        let newSchema = new CalenderSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET.NAME));
    }

    public static getValidCalenderSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CalenderSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET.NAME);
        return CalenderSheetSchema.getValidSchema(spreadsheet.getSheetByName(CalenderSheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}