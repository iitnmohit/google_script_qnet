import { ISchema } from "../interface/ISchema";
import { IColumn, ISheet } from "../interface/ISheet";
import { Predicates } from "../library/Predicates";

export abstract class BaseSchema implements ISchema {

    // public abstract fields
    public abstract SPREADSHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public abstract ISHEET: ISheet;
    public abstract NUM_OF_ROWS: number;
    public abstract NUM_OF_COLUMNS: number;
    public abstract HEADDER_ROW_FONT_COLOR: string;
    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;

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