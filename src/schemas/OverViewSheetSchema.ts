import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class OverViewSheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "OVERVIEW";
    public static readonly SHEET_INDEX: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;

    public DEFAULT_ROW_COUNT: number = 10;
    public DEFAULT_COL_COUNT: number = 10;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): OverViewSheetSchema {
        return new OverViewSheetSchema(sheet);
    }

    public getSheetName(): string {
        return OverViewSheetSchema.SHEET_NAME;
    }

    public getHeadderValues(): Array<string> {
        return [
            
        ];
    }
}