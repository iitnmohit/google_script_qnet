import { ISchema } from "../interface/ISchema";
import { ISheet } from "../interface/ISheet";
import { Predicates } from "../library/Predicates";

export abstract class BaseSchema implements ISchema {

    // public abstract fields
    public abstract CURRENT_SHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public abstract ISHEET: ISheet;
    public abstract NUM_OF_ROWS: number;
    public abstract NUM_OF_COLUMNS: number;
    public abstract HEADDER_ROW_FONT_COLOR: string;
    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;
    public abstract FREEZE_ROW: number;
    public abstract FREEZE_COLUMN: number;

    // public abstract methods
    public abstract getMinColWidth(index: number): number;
    public abstract getMaxColWidth(index: number): number;

    public insertRows(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.CURRENT_SHEET.insertRows(this.NUM_OF_ROWS, howMany);
        this.NUM_OF_ROWS += howMany;
    }

    public insertsColumns(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.CURRENT_SHEET.insertColumns(this.NUM_OF_COLUMNS, howMany);
        this.NUM_OF_COLUMNS += howMany;
    }

    public removeRow(index: number, howmany?: number): void {
        if (index < 1) {
            return;
        }
        if (Predicates.IS_NULL.test(howmany)) {
            this.CURRENT_SHEET.deleteRow(index);
            this.NUM_OF_ROWS--;
        } else if (Predicates.IS_POSITIVE.test(howmany)) {
            this.CURRENT_SHEET.deleteRows(index, howmany);
            this.NUM_OF_ROWS -= howmany;
        }
    }

    // other public methods
}