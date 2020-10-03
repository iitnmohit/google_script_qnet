import { ThemeUtil } from "../util/ThemeUtil";

export abstract class BaseSheetSchema {
    public static readonly MSG_ERROR_SHEET_EQ_NULL: string = " sheet not found.";
    public static readonly MSG_INVALID_SHEET_NAME: string = " sheet name is not valid.";
    public static readonly MSG_ERROR_INVALID_SHEET: string = " sheet is not valid.";

    public static readonly MINIUM_ROW_HEIGHT: number = 5;

    public abstract DEFAULT_ROW_COUNT: number;
    public abstract DEFAULT_COL_COUNT: number;

    public abstract HEADDER_ROW_FONT_COLOR: string;
    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;

    public ROW_HEIGHT: number = ThemeUtil.getCurrentTheme().rowHeight;

    public abstract getSheetName(): string;

    public abstract getHeadderValues(): Array<string>;
}