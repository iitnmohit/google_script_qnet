import { DefaultSchema } from "../constants/DefaultSchema";
import { SheetMessage } from "../constants/Message";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class CitySheetSchema extends BaseSheetSchema {
    // static variable
    public static readonly SHEET_NAME: string = DefaultSchema.CITY_SHEET_NAME;
    public static readonly SHEET_INDEX: number = DefaultSchema.CITY_SHEET_INDEX;

    public static readonly COL_LOCATION: string = DefaultSchema.CITY_SHEET_COL_LOCATION;
    public static readonly COL_COUNT: string = DefaultSchema.CITY_SHEET_COL_COUNT;

    // public local variable
    public readonly locationColIndex: number = -1;
    public readonly countColIndex: number = -1;

    // public abstract variable
    public NUM_OF_ROWS: number = DefaultSchema.CITY_SHEET_NUM_OF_ROWS;
    public NUM_OF_COLUMNS: number = DefaultSchema.CITY_SHEET_NUM_OF_COLUMNS;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.currentSheet = Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, CitySheetSchema.SHEET_NAME);
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            switch (firstRowRangeValues[0][i]) {
                case CitySheetSchema.COL_LOCATION: this.locationColIndex = i + 1;
                    break;
                case CitySheetSchema.COL_COUNT: this.countColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
    }

    // static method
    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        return new CitySheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, CitySheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === CitySheetSchema.SHEET_NAME,
            SheetMessage.INVALID_SHEET, CitySheetSchema.SHEET_NAME);

        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(SheetMessage.INVALID_SHEET, CitySheetSchema.SHEET_NAME));
    }

    public static getValidCitySchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CitySheetSchema {
        Preconditions.checkNotNull(spreadsheet, SheetMessage.SHEET_NOT_FOUND, CitySheetSchema.SHEET_NAME);
        return CitySheetSchema.getValidSchema(spreadsheet.getSheetByName(CitySheetSchema.SHEET_NAME));
    }

    // public abstract methods 
    public getSheetName(): string {
        return CitySheetSchema.SHEET_NAME;
    }

    public getHeadderValues(): Array<string> {
        return [
            CitySheetSchema.COL_LOCATION,
            CitySheetSchema.COL_COUNT
        ];
    }

    public getMinColWidth(index: number): number {
        switch (index) {
            case this.locationColIndex: return DefaultSchema.CITY_SHEET_MIN_WIDTH_COL_LOCATION;
            case this.countColIndex: return DefaultSchema.CITY_SHEET_MIN_WIDTH_COL_COUNT;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.locationColIndex: return DefaultSchema.CITY_SHEET_MAX_WIDTH_COL_LOCATION;
            case this.countColIndex: return DefaultSchema.CITY_SHEET_MAX_WIDTH_COL_COUNT;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, SheetMessage.INVALID_SHEET, CitySheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.locationColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.countColIndex)) return false;
        this.isThisSchemaValid = true;
        return true;
    }
}