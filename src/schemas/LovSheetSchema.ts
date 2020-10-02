import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class LovSheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "Lists";
    public static readonly SHEET_INDEX: number = 3;

    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;

    public DEFAULT_ROW_COUNT: number = 100;
    public DEFAULT_COL_COUNT: number = 9;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): LovSheetSchema {
        return new LovSheetSchema(sheet);
    }

    public getSheetName(): string {
        return LovSheetSchema.SHEET_NAME;
    }
}