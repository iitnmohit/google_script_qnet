export interface ISchema {
    NUM_OF_ROWS: number;
    NUM_OF_COLUMNS: number;

    HEADDER_ROW_FONT_COLOR: string;
    HEADDER_ROW_COLOR: string;
    FIRST_ROW_COLOR: string;
    SECOND_ROW_COLOR: string;

    FREEZE_ROW: number;
    FREEZE_COLUMN: number;

    getSheetName(): string;

    getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet;

    getHeadderValues(): Array<string>;

    getMinColWidth(index: number): number;

    getMaxColWidth(index: number): number | null;
}