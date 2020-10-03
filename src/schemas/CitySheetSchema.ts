import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class CitySheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "City";
    public static readonly SHEET_INDEX: number = 4;

    public static readonly COL_LOCATION: string = "Location";
    public static readonly COL_COUNT: string = "Count";

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;

    public DEFAULT_ROW_COUNT: number = 500;
    public DEFAULT_COL_COUNT: number = 2;

    public readonly locationColIndex: number = -1;
    public readonly countColIndex: number = -1;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
        let columnLength = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getRange(1, 1, 1, columnLength).getValues();
        for (let i = 0; i < columnLength; i++) {
            if (firstRowRangeValues[0][i] === CitySheetSchema.COL_LOCATION) {
                this.locationColIndex = i + 1;
            } else if (firstRowRangeValues[0][i] === CitySheetSchema.COL_COUNT) {
                this.countColIndex = i + 1;
            }
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): CitySheetSchema {
        return new CitySheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CitySheetSchema {
        if (null == sheet) {
            throw new Error(CitySheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_SHEET_EQ_NULL);
        }
        if (sheet.getName() !== CitySheetSchema.SHEET_NAME) {
            throw new Error(CitySheetSchema.SHEET_NAME + BaseSheetSchema.MSG_INVALID_SHEET_NAME);
        }
        let newSchema = new CitySheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(CitySheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_INVALID_SHEET);
    }

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
        if(index == null || index < 1){
            return null;
        }
        switch (index) {
            case this.locationColIndex: return 200;
            default: return null;
        }
    }
    public getMaxColWidth(index: number): number {
        return null;
    }

    private isSchemaValid(): boolean {
        if (this.locationColIndex < 1) return false;
        if (this.countColIndex < 1) return false;
        return true;
    }
}