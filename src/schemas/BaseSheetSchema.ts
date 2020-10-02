export abstract class BaseSheetSchema {
    public static readonly DEFAULT_ROW_HEIGHT: number = 25;
    public static readonly MINIUM_ROW_HEIGHT: number = 5;

    public abstract DEFAULT_ROW_COUNT: number;
    public abstract DEFAULT_COL_COUNT: number;
    public abstract ROW_HEIGHT: number;
    public abstract HEADDER_ROW_COLOR:string;
    public abstract FIRST_ROW_COLOR:string;
    public abstract SECOND_ROW_COLOR:string;

    public abstract getSheetName(): string;
}