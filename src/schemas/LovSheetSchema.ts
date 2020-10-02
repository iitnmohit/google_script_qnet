import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class LovSheetSchema extends BaseSheetSchema{
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableSecondRowColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().lovTableHeadderColor;
    public ROW_HEIGHT: number = BaseSheetSchema.DEFAULT_ROW_HEIGHT;
    public DEFAULT_ROW_COUNT:number = 100;
    public DEFAULT_COL_COUNT:number = 9;

    public static readonly SHEET_INDEX:number = 3;
    public static readonly SHEET_NAME :string= "Lists";

    public getSheetName(): string {
        return LovSheetSchema.SHEET_NAME;
    }

    private constructor(private sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): LovSheetSchema {
        if (null == sheet) {
            return new LovSheetSchema(null);
        }
        return new LovSheetSchema(sheet);
    }
}