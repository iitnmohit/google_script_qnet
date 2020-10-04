export interface ISchema {
    DEFAULT_ROW_COUNT: number;
    DEFAULT_COL_COUNT: number;

    HEADDER_ROW_FONT_COLOR: string;
    HEADDER_ROW_COLOR: string;
    FIRST_ROW_COLOR: string;
    SECOND_ROW_COLOR: string;

    ROW_HEIGHT: number;
    FREEZE_ROW: number;
    FREEZE_COLUMN: number;

    getSheetName(): string;

    getHeadderValues(): Array<string>;

    getMinColWidth(index: number): number;

    getMaxColWidth(index: number): number | null;

    getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet;
}