import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { IOverViewSheet, ITable } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Index } from "../library/Index";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";
import { Util } from "../util/Util";

export class OverViewSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.OVERVIEW.NAME;
    public static readonly SHEET_INDEX: number = Sheets.OVERVIEW.INDEX;

    // public local variable
    public readonly tableOverallRowIndex: number = -1;
    public readonly tableOverallColIndex: number = -1;
    public readonly tableListWiseRowIndex: number = -1;
    public readonly tableListWiseColIndex: number = -1;

    // public abstract variable
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
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        this.NUM_OF_ROWS = sheet.getMaxRows();
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        let sheetValues = sheet.getSheetValues(1, 1, this.NUM_OF_ROWS, this.NUM_OF_COLUMNS);
        let overAllTableBeginIndex = this.validateTable(Sheets.OVERVIEW.TABLES.TABLE_OVERALL,
            sheetValues, new Index(0, 0));
        let overAllTableEndIndex = new Index(overAllTableBeginIndex.row + Sheets.OVERVIEW.TABLES.TABLE_OVERALL.HEIGHT - 1,
            overAllTableBeginIndex.col + Sheets.OVERVIEW.TABLES.TABLE_OVERALL.WIDTH - 1);

        let listWiseTableBeginIndex = this.validateTable(Sheets.OVERVIEW.TABLES.TABLE_LIST_WISE,
            sheetValues, overAllTableEndIndex);
        let listWiseTableEndIndex = new Index(listWiseTableBeginIndex.row + Sheets.OVERVIEW.TABLES.TABLE_LIST_WISE.HEIGHT - 1,
            listWiseTableBeginIndex.col + Sheets.OVERVIEW.TABLES.TABLE_LIST_WISE.WIDTH - 1);
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
        throw new InvalidSheetException(Preconditions.format(Msg.SHEET.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME));
    }

    public static getValidOverViewSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): OverViewSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        return OverViewSheetSchema.getValidSchema(spreadsheet.getSheetByName(OverViewSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
    public getSheetName(): string {
        return OverViewSheetSchema.SHEET_NAME;
    }

    public getMinColWidth(index: number): number {
        return null;
    }
    public getMaxColWidth(index: number): number {
        return null;
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, Msg.SHEET.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    public insertRows(howMany: number): void {
        this.currentSheet.insertRows(this.NUM_OF_ROWS, howMany);
        this.NUM_OF_ROWS += howMany;
    }

    public insertsColumns(howMany: number): void {
        this.currentSheet.insertColumns(this.NUM_OF_COLUMNS, howMany);
        this.NUM_OF_COLUMNS += howMany;
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
                        Preconditions.format(Msg.SHEET.INVALID_SHEET, this.getSheetName()));
                }
            }
        }
        let leftHeadder = table.HEADDER.LEFT.VALUES;
        if (Predicates.IS_LIST_NOT_EMPTY.test(leftHeadder)) {
            for (let index = 0; index < leftHeadder.length; index++) {
                if (sheetValues[tableIndex.row - 1 + index][tableIndex.col - 1] != leftHeadder[index]) {
                    throw new InvalidSheetException(
                        Preconditions.format(Msg.SHEET.INVALID_SHEET, this.getSheetName()));
                }
            }
        }
        return tableIndex;
    }
}