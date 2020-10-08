import { DefaultSchema } from "../constants/DefaultSchema";
import { ISchema } from "../interface/ISchema";

export abstract class BaseSheetSchema implements ISchema {
    //implement from interface
    public abstract NUM_OF_ROWS: number;
    public abstract NUM_OF_COLUMNS: number;

    public abstract HEADDER_ROW_FONT_COLOR: string;
    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;

    public FREEZE_ROW: number = DefaultSchema.numOfFreezeRow;
    public FREEZE_COLUMN: number = DefaultSchema.numOfFreezeCol;

    public abstract getSheetName(): string;

    public abstract getHeadderValues(): Array<string>;

    public abstract getMinColWidth(index: number): number;

    public abstract getMaxColWidth(index: number): number | null;

    public abstract getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet;
}