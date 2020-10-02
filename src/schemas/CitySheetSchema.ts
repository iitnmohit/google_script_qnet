import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class CitySheetSchema extends BaseSheetSchema {
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().cityTableHeadderColor;
    public ROW_HEIGHT: number = BaseSheetSchema.DEFAULT_ROW_HEIGHT;
    public DEFAULT_ROW_COUNT: number = 500;
    public DEFAULT_COL_COUNT: number = 2;

    public static readonly SHEET_INDEX = 4;
    public static readonly SHEET_NAME = "City";

    public static readonly COL_LOCATION = "Location";
    public static readonly COL_COUNT = "Count";

    public getSheetName(): string {
        return CitySheetSchema.SHEET_NAME;
    }

    private constructor(private sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): CitySheetSchema {
        if (null == sheet) {
            return new CitySheetSchema(null);
        }
        return new CitySheetSchema(sheet);
    }
}