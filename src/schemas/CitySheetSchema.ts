import { Sheets } from "../constants/Sheets";
import { Msg } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";

export class CitySheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.CITY.NAME;
    public static readonly SHEET_INDEX: number = Sheets.CITY.INDEX;

    public static readonly COL_LOCATION: string = Sheets.CITY.COLUMN.LOCATION;
    public static readonly COL_COUNT: string = Sheets.CITY.COLUMN.COUNT;

    // public local variable
    public readonly locationColIndex: number = -1;
    public readonly countColIndex: number = -1;

    // public abstract variable
    public NUM_OF_ROWS: number = Sheets.CITY.NUM_OF.ROWS;
    public NUM_OF_COLUMNS: number = Sheets.CITY.NUM_OF.COLUMNS;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;

    public FREEZE_ROW: number = Sheets.CITY.FREEZE.ROW;
    public FREEZE_COLUMN: number = Sheets.CITY.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET_NAME);
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
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === CitySheetSchema.SHEET_NAME,
            Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET_NAME);

        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET_NAME));
    }

    public static getValidCitySchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CitySheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CitySheetSchema.SHEET_NAME);
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
            case this.locationColIndex: return Sheets.CITY.MIN_WIDTH.LOCATION;
            case this.countColIndex: return Sheets.CITY.MIN_WIDTH.COUNT;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.locationColIndex: return Sheets.CITY.MAX_WIDTH.LOCATION;
            case this.countColIndex: return Sheets.CITY.MAX_WIDTH.COUNT;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, Msg.SHEET.INVALID_SHEET, CitySheetSchema.SHEET_NAME);
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