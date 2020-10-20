import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ICitySheet, IColumn, ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSchema } from "./BaseSchema";

export class CitySheetSchema extends BaseSchema {
    // static variable
    public static readonly SHEET: ICitySheet = Sheets.CITY;

    public static readonly COL_LOCATION: string = CitySheetSchema.SHEET.COLUMN.LOCATION;
    public static readonly COL_COUNT: string = CitySheetSchema.SHEET.COLUMN.COUNT;

    // public local variable

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = CitySheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;
    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
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
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
        Preconditions.checkArgument(sheet.getName() === CitySheetSchema.SHEET.NAME,
            Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET.NAME);

        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET.NAME));
    }

    public static getValidCitySchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CitySheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
        return CitySheetSchema.getValidSchema(spreadsheet.getSheetByName(CitySheetSchema.SHEET.NAME));
    }

    // public abstract methods 

    // public local methods

    // private local method
}