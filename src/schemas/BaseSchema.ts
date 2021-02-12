import { Msg } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { IColumn, ISheet, ITable } from "../interface/ISheet";
import { ITableTheme } from "../interface/ITheme";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { Util } from "../util/Util";

export abstract class BaseSchema implements ISchema {

    // public fields
    public SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public NUM_OF_ROWS: number;
    public NUM_OF_COLUMNS: number;
    public ISHEET: ISheet;

    public HEADDER_ROW_FONT_COLOR: string;
    public HEADDER_ROW_COLOR: string;
    public FIRST_ROW_COLOR: string;
    public SECOND_ROW_COLOR: string;

    constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet, isheet: ISheet, tableTheme: ITableTheme) {
        this.ISHEET = isheet;
        this.SPREADSHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, isheet.NAME);
        this.NUM_OF_ROWS = sheet.getMaxRows();
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();

        this.HEADDER_ROW_FONT_COLOR = tableTheme.HEADDER_FONT_COLOR;
        this.HEADDER_ROW_COLOR = tableTheme.HEADDER_COLOR;
        this.FIRST_ROW_COLOR = tableTheme.FIRST_ROW_COLOR;
        this.SECOND_ROW_COLOR = tableTheme.SECOND_ROW_COLOR;

        if (Predicates.IS_LIST_EMPTY.test(isheet.COLUMNS)) {
            return;
        }
        let firstRowValues = sheet.getRange(1, 1, 1, this.NUM_OF_COLUMNS).getDisplayValues()[0];
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            let baseSchemaColumn: IColumn = isheet.COLUMNS.find((column: IColumn) => {
                if (column.NAME === firstRowValues[i]) {
                    return true;
                }
                return false;
            });
            
            if(Predicates.IS_NOT_NULL.test(baseSchemaColumn)){
                baseSchemaColumn.INDEX = i + 1;
            }
        }
    }

    // public abstract methods
    public getColIndexByName(colName: string): number {
        if (Predicates.IS_BLANK.test(colName)) {
            return -1;
        }
        if (Predicates.IS_LIST_EMPTY.test(this.ISHEET.COLUMNS)) {
            return -1;
        }
        let column = this.ISHEET.COLUMNS.find((column: IColumn) => {
            if (column.NAME === colName) {
                return true;
            }
            return false;
        });
        if (Predicates.IS_NULL.test(column)) {
            return -1;
        }
        return column.INDEX;
    }

    public getMinColWidth(index: number): number {
        if (Predicates.IS_LIST_EMPTY.test(this.ISHEET.COLUMNS)) {
            return null;
        }
        if (Predicates.IS_NOT_POSITIVE.test(index)) {
            return null;
        }
        let column = this.ISHEET.COLUMNS.find((column: IColumn) => {
            if (column.INDEX === index) {
                return true;
            }
            return false;
        });
        if (Predicates.IS_NULL.test(column)) {
            return null;
        }
        return column.MIN_WIDTH;
    }

    public getMaxColWidth(index: number): number {
        if (Predicates.IS_LIST_EMPTY.test(this.ISHEET.COLUMNS)) {
            return null;
        }
        if (Predicates.IS_NOT_POSITIVE.test(index)) {
            return null;
        }
        let column = this.ISHEET.COLUMNS.find((column: IColumn) => {
            if (column.INDEX === index) {
                return true;
            }
            return false;
        });
        if (Predicates.IS_NULL.test(column)) {
            return null;
        }
        return column.MAX_WIDTH;
    }

    public insertRows(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.SPREADSHEET.insertRows(this.NUM_OF_ROWS, howMany);
        this.NUM_OF_ROWS += howMany;
    }

    public insertsColumns(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.SPREADSHEET.insertColumns(this.NUM_OF_COLUMNS, howMany);
        this.NUM_OF_COLUMNS += howMany;
    }

    public removeRow(index: number, howmany?: number): void {
        if (index < 1) {
            return;
        }
        if (Predicates.IS_NULL.test(howmany)) {
            this.SPREADSHEET.deleteRow(index);
            this.NUM_OF_ROWS--;
        } else if (Predicates.IS_POSITIVE.test(howmany)) {
            this.SPREADSHEET.deleteRows(index, howmany);
            this.NUM_OF_ROWS -= howmany;
        }
    }

    public getColumnRangeByName(columnName: string): GoogleAppsScript.Spreadsheet.Range {
        return this.SPREADSHEET.getRange(2, this.getColIndexByName(columnName), this.NUM_OF_ROWS - 1, 1);
    }

    public getColumnA1NotationByName(columnName: string): string {
        let colIndex = this.getColIndexByName(columnName);
        let sheetName = this.ISHEET.NAME;
        return Util.getColumnA1Notation(colIndex, 1, sheetName);
    }

    public getCellRange(row: number, columnName: string): GoogleAppsScript.Spreadsheet.Range {
        return this.SPREADSHEET.getRange(row, this.getColIndexByName(columnName));
    }

    public getCellA1Notation(row: number, columnName: string): string {
        return this.getCellRange(row, columnName).getA1Notation();
    }

    public setFormulaToColumn(columnName: string, formula: string): void {
        this.getColumnRangeByName(columnName).setFormula(formula);
    }

    public setFormulasToTable(table: ITable, formulas: string[][]): void {
        let rowShift = Predicates.IS_LIST_EMPTY.test(table.HEADDER.TOP.VALUES) ? 0 : 1;
        let columShift = Predicates.IS_LIST_EMPTY.test(table.HEADDER.LEFT.VALUES) ? 0 : 1;

        this.SPREADSHEET.getRange(table.INDEX.row + rowShift, table.INDEX.col + columShift,
            table.HEIGHT - rowShift, table.WIDTH - columShift).setFormulas(formulas);
    }

    public getTableValues(table: ITable): string[][] {
        let tableValues = this.SPREADSHEET.getRange(table.INDEX.row, table.INDEX.col,
            table.HEIGHT, table.WIDTH).getDisplayValues();
        return tableValues;
    }

    public setValues(row: number, column: number, values: Array<Array<any>>): void {
        if (Predicates.IS_LIST_EMPTY.test(values)) {
            return;
        }
        this.SPREADSHEET.getRange(row, column, values.length, values[0].length)
            .setValues(values);
    }

    // protected methods
    protected isSchemaValid(): boolean {
        if (Predicates.IS_LIST_EMPTY.test(this.ISHEET.COLUMNS)) {
            return true;
        }
        for (let column of this.ISHEET.COLUMNS) {
            if (Predicates.IS_NOT_POSITIVE.test(column.INDEX)) return false;
        }
        return true;
    }
}