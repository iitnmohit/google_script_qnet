import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class CitySheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "City";
    public static readonly SHEET_INDEX: number = 4;

    public static readonly COL_LOCATION: string = "Location";
    public static readonly COL_COUNT: string = "Count";

    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;

    public DEFAULT_ROW_COUNT: number = 500;
    public DEFAULT_COL_COUNT: number = 2;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): CitySheetSchema {
        return new CitySheetSchema(sheet);
    }

    public getSheetName(): string {
        return CitySheetSchema.SHEET_NAME;
    }
}