import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ICitySheet, ISheet } from "../interface/ISheet";
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
    public readonly locationColIndex: number = -1;
    public readonly countColIndex: number = -1;

    // public abstract variable
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: ISheet = CitySheetSchema.SHEET;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;

    public FREEZE_ROW: number = CitySheetSchema.SHEET.FREEZE.ROW;
    public FREEZE_COLUMN: number = CitySheetSchema.SHEET.FREEZE.COLUMN;

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET.NAME);
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getSheetValues(1, 1, 1, this.NUM_OF_COLUMNS);
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            switch (firstRowRangeValues[0][i]) {
                case CitySheetSchema.COL_LOCATION: this.locationColIndex = i + 1;
                    break;
                case CitySheetSchema.COL_COUNT: this.countColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
        this.NUM_OF_ROWS = sheet.getMaxRows();
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
    public getMinColWidth(index: number): number {
        switch (index) {
            case this.locationColIndex: return CitySheetSchema.SHEET.MIN_WIDTH.LOCATION;
            case this.countColIndex: return CitySheetSchema.SHEET.MIN_WIDTH.COUNT;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.locationColIndex: return CitySheetSchema.SHEET.MAX_WIDTH.LOCATION;
            case this.countColIndex: return CitySheetSchema.SHEET.MAX_WIDTH.COUNT;
            default: return null;
        }
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.locationColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.countColIndex)) return false;
        return true;
    }
}