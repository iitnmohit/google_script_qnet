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
    // static variable
    public static readonly SHEET_NAME: string = Sheets.OVERVIEW.NAME;
    public static readonly SHEET_INDEX: number = Sheets.OVERVIEW.INDEX;

    // public local variable
    public readonly tableOverallRowIndex: number = -1;
    public readonly tableOverallColIndex: number = -1;
    public readonly tableListWiseRowIndex: number = -1;
    public readonly tableListWiseColIndex: number = -1;

    // public abstract variable
    public CURRENT_SHEET: GoogleAppsScript.Spreadsheet.Sheet;
    public ISHEET: IOverViewSheet = Sheets.OVERVIEW;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;

    public FREEZE_ROW: number = Sheets.OVERVIEW.FREEZE.ROW;
    public FREEZE_COLUMN: number = Sheets.OVERVIEW.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        this.CURRENT_SHEET = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        this.NUM_OF_ROWS = sheet.getMaxRows();
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
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
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === OverViewSheetSchema.SHEET_NAME,
            Msg.SHEET.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME);

        let newSchema = new OverViewSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME));
    }

    public static getValidOverViewSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): OverViewSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        return OverViewSheetSchema.getValidSchema(spreadsheet.getSheetByName(OverViewSheetSchema.SHEET_NAME));
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
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.tableOverallRowIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableOverallColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableListWiseRowIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.tableListWiseColIndex)) return false;
        this.isThisSchemaValid = true;
        return true;
    }

    private validateTable(table: ITable, sheetValues: any[][], lastValuedCellIndex: Index): Index {
        let tableIndex = Util.getTableIndex(lastValuedCellIndex, table);
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