import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class OverViewSheetSchema extends BaseSheetSchema{
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public ROW_HEIGHT: number = BaseSheetSchema.DEFAULT_ROW_HEIGHT;
    public DEFAULT_ROW_COUNT:number = 10;
    public  DEFAULT_COL_COUNT:number = 10;

    public static readonly SHEET_INDEX = 1;
    public static readonly SHEET_NAME = "OVERVIEW";

    public getSheetName(): string {
        return OverViewSheetSchema.SHEET_NAME;
    }

    private constructor(private sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): OverViewSheetSchema {
        if (null == sheet) {
            return new OverViewSheetSchema(null);
        }
        return new OverViewSheetSchema(sheet);
    }
}