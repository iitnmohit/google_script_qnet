import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { IOverViewSheet, ITable } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Index } from "../library/Index";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { Util } from "../util/Util";
import { BaseSchema } from "./BaseSchema";

export class OverViewSheetSchema extends BaseSchema {
    private static instance: OverViewSheetSchema = null;
    // static variable

    // public local variable
    public readonly tableOverallRowIndex: number = -1;
    public readonly tableOverallColIndex: number = -1;
    public readonly tableListWiseRowIndex: number = -1;
    public readonly tableListWiseColIndex: number = -1;

    // public abstract variable
    public ISHEET: IOverViewSheet = Sheets.OVERVIEW;

    // private local variable

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super(sheet, Sheets.OVERVIEW, ThemeUtil.getCurrentTheme().OVERVIEW_SHEET);

        let sheetValues = sheet.getSheetValues(1, 1, this.NUM_OF_ROWS, this.NUM_OF_COLUMNS);
        let overAllTableBeginIndex = this.validateTable(Sheets.OVERVIEW.TABLES.TABLE_OVERALL,
            sheetValues, new Index(0, 0));
        this.ISHEET.TABLES.TABLE_OVERALL.INDEX = overAllTableBeginIndex;

        let overAllTableEndIndex = new Index(overAllTableBeginIndex.row + Sheets.OVERVIEW.TABLES.TABLE_OVERALL.HEIGHT - 1,
            overAllTableBeginIndex.col + Sheets.OVERVIEW.TABLES.TABLE_OVERALL.WIDTH - 1);

        let listWiseTableBeginIndex = this.validateTable(Sheets.OVERVIEW.TABLES.TABLE_LIST_WISE,
            sheetValues, overAllTableEndIndex);
        this.ISHEET.TABLES.TABLE_LIST_WISE.INDEX = listWiseTableBeginIndex;

        this.tableOverallRowIndex = overAllTableBeginIndex.row;
        this.tableOverallColIndex = overAllTableBeginIndex.col;
        this.tableListWiseRowIndex = listWiseTableBeginIndex.row;
        this.tableListWiseColIndex = listWiseTableBeginIndex.col;
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): OverViewSheetSchema {
        if (Predicates.IS_NOT_NULL.test(OverViewSheetSchema.instance)) {
            return OverViewSheetSchema.instance;
        }
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, Sheets.OVERVIEW.NAME);
        Preconditions.checkArgument(sheet.getName() === Sheets.OVERVIEW.NAME,
            Msg.SHEET.INVALID_SHEET, Sheets.OVERVIEW.NAME);

        let newSchema = new OverViewSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            OverViewSheetSchema.instance = newSchema;
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, Sheets.OVERVIEW.NAME));
    }

    public static getValidOverViewSchema(): OverViewSheetSchema {
        if (Predicates.IS_NOT_NULL.test(OverViewSheetSchema.instance)) {
            return OverViewSheetSchema.instance;
        }
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, Sheets.OVERVIEW.NAME);
        return OverViewSheetSchema.getValidSchema(spreadsheet.getSheetByName(Sheets.OVERVIEW.NAME));
    }

    // public abstract methods 
    public getMinColWidth(index: number): number {
        switch (index) {
            case 1: return Sheets.OVERVIEW.MIN_WIDTH.COLA;
            case 2: return Sheets.OVERVIEW.MIN_WIDTH.COLB;
            case 3: return Sheets.OVERVIEW.MIN_WIDTH.COLC;
            case 4: return Sheets.OVERVIEW.MIN_WIDTH.COLD;
            case 5: return Sheets.OVERVIEW.MIN_WIDTH.COLE;
            case 6: return Sheets.OVERVIEW.MIN_WIDTH.COLF;
            case 7: return Sheets.OVERVIEW.MIN_WIDTH.COLG;
            case 8: return Sheets.OVERVIEW.MIN_WIDTH.COLH;
            case 9: return Sheets.OVERVIEW.MIN_WIDTH.COLI;
            case 10: return Sheets.OVERVIEW.MIN_WIDTH.COLJ;
            default: return null;
        }
    }
    public getMaxColWidth(index: number): number {
        switch (index) {
            case 1: return Sheets.OVERVIEW.MAX_WIDTH.COLA;
            case 2: return Sheets.OVERVIEW.MAX_WIDTH.COLB;
            case 3: return Sheets.OVERVIEW.MAX_WIDTH.COLC;
            case 4: return Sheets.OVERVIEW.MAX_WIDTH.COLD;
            case 5: return Sheets.OVERVIEW.MAX_WIDTH.COLE;
            case 6: return Sheets.OVERVIEW.MAX_WIDTH.COLF;
            case 7: return Sheets.OVERVIEW.MAX_WIDTH.COLG;
            case 8: return Sheets.OVERVIEW.MAX_WIDTH.COLH;
            case 9: return Sheets.OVERVIEW.MAX_WIDTH.COLI;
            case 10: return Sheets.OVERVIEW.MAX_WIDTH.COLJ;
            default: return null;
        }
    }

    // public local methods

    // private local method
    protected isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.tableOverallRowIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableOverallColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableListWiseRowIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableListWiseColIndex)) return false;
        return true;
    }

    private validateTable(table: ITable, sheetValues: any[][], lastValuedCellIndex: Index): Index {
        let tableIndex = Util.getExpectedTableStartIndex(lastValuedCellIndex, table);
        let topHeadder = table.HEADDER.TOP.VALUES;
        if (Predicates.IS_LIST_NOT_EMPTY.test(topHeadder)) {
            for (let index = 0; index < topHeadder.length; index++) {
                if (sheetValues[tableIndex.row - 1][tableIndex.col + index - 1] != topHeadder[index]) {
                    throw new InvalidSheetException(
                        Utilities.formatString(Msg.SHEET.INVALID_SHEET, this.ISHEET.NAME));
                }
            }
        }
        let leftHeadder = table.HEADDER.LEFT.VALUES;
        if (Predicates.IS_LIST_NOT_EMPTY.test(leftHeadder)) {
            for (let index = 0; index < leftHeadder.length; index++) {
                if (sheetValues[tableIndex.row - 1 + index][tableIndex.col - 1] != leftHeadder[index]) {
                    throw new InvalidSheetException(
                        Utilities.formatString(Msg.SHEET.INVALID_SHEET, this.ISHEET.NAME));
                }
            }
        }
        return tableIndex;
    }
}