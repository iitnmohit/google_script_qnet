import { ISheet } from "./ISheet";

export interface ISchema {
    SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    ISHEET: ISheet,
    NUM_OF_ROWS: number;
    NUM_OF_COLUMNS: number;

    HEADDER_ROW_FONT_COLOR: string;
    HEADDER_ROW_COLOR: string;
    FIRST_ROW_COLOR: string;
    SECOND_ROW_COLOR: string;

    FREEZE_ROW: number;
    FREEZE_COLUMN: number;

    getColIndexByName(colName: string): number;

    getMinColWidth(index: number): number;

    getMaxColWidth(index: number): number | null;

    insertRows(howMany: number): void;

    insertsColumns(howMany: number): void;

    removeRow(index: number, howmany?: number): void;
}