import { ISheet, ITable } from "./ISheet";

export interface ISchema {
    SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    ISHEET: ISheet,
    NUM_OF_ROWS: number;
    NUM_OF_COLUMNS: number;

    HEADDER_ROW_FONT_COLOR: string;
    HEADDER_ROW_COLOR: string;
    FIRST_ROW_COLOR: string;
    SECOND_ROW_COLOR: string;

    getColIndexByName(colName: string): number;

    getMinColWidth(index: number): number;

    getMaxColWidth(index: number): number | null;

    insertRows(howMany: number): void;

    insertsColumns(howMany: number): void;

    removeRow(index: number, howmany?: number): void;

    getColumnRangeByName(columnName: string): GoogleAppsScript.Spreadsheet.Range;

    getColumnA1NotationByName(columnName: string): string;

    getCellRange(row: number, columnName: string): GoogleAppsScript.Spreadsheet.Range;

    getCellA1Notation(row: number, columnName: string): string;

    setFormulaToColumn(columnName: string, formula: string): void;

    setFormulasToTable(table: ITable, formulas: string[][]): void;

    getTableValues(table: ITable): string[][];
}