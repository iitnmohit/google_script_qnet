import { ThemeUtil } from "../util/ThemeUtil";

export abstract class BaseSheetSchema {
    public static readonly MINIUM_ROW_HEIGHT: number = 5;

    public abstract DEFAULT_ROW_COUNT: number;
    public abstract DEFAULT_COL_COUNT: number;


    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;

    public ROW_HEIGHT: number = ThemeUtil.getCurrentTheme().rowHeight;

    public abstract getSheetName(): string;
}