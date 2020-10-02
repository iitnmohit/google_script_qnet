import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { ThemeUtil } from "../util/ThemeUtil";

export class SetUpService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private overviewSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private nameListSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private lovSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private citySheet: GoogleAppsScript.Spreadsheet.Sheet;

    constructor () {
        this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        this.setSpreadsheetTheme(this.spreadsheet);
    }

    public deleteNonQnetSheets(): void {
        let sheets = this.spreadsheet.getSheets();
        let totalNumOfSheets = sheets.length;
        let numOfSheetDeleted = 0;
        if (sheets != null && totalNumOfSheets > 0) {
            for (let sheet of sheets) {
                let sheetName = sheet.getName();
                if (sheetName === OverViewSheetSchema.SHEET_NAME
                    || sheetName === NameListSheetSchema.SHEET_NAME
                    || sheetName === LovSheetSchema.SHEET_NAME
                    || sheetName === CitySheetSchema.SHEET_NAME) {
                    continue;
                }
                if (totalNumOfSheets - numOfSheetDeleted != 1) {
                    this.spreadsheet.deleteSheet(sheet);
                    numOfSheetDeleted++;
                } else {
                    sheet.setName("Sheet 1");
                    sheet.clear();
                }
            }
        }
    }

    public createOverViewSheets() {
        this.overviewSheet = this.setUpSheet(OverViewSheetSchema.getCompormisedSchema());
    }

    public createNameListSheets() {
        this.nameListSheet = this.setUpSheet(NameListSheetSchema.getCompormisedSchema());
    }

    public createLovSheets() {
        this.lovSheet = this.setUpSheet(LovSheetSchema.getCompormisedSchema());
    }

    public createCitySheets() {
        this.citySheet = this.setUpSheet(CitySheetSchema.getCompormisedSchema());
    }

    private setUpSheet(schema: BaseSheetSchema): GoogleAppsScript.Spreadsheet.Sheet {
        let sheet = this.createOrClearSheet(schema.getSheetName());

        this.ensureRowsCount(sheet, schema.DEFAULT_ROW_COUNT);
        this.ensureColsCount(sheet, schema.DEFAULT_COL_COUNT);

        this.setRowsHeight(sheet, schema.ROW_HEIGHT);
        sheet.getRange(1, 1, schema.DEFAULT_ROW_COUNT, schema.DEFAULT_COL_COUNT)
            .applyRowBanding(ThemeUtil.getCurrentTheme().defaultBandingTheme, true, false)
            .setHeaderRowColor(schema.HEADDER_ROW_COLOR)
            .setFirstRowColor(schema.FIRST_ROW_COLOR)
            .setSecondRowColor(schema.SECOND_ROW_COLOR);
        sheet.setActiveSelection("A1");
        return sheet;
    }

    private setSpreadsheetTheme(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        let theme = ThemeUtil.getCurrentSpreadsheetTheme(spreadsheet.resetSpreadsheetTheme());
        spreadsheet.setSpreadsheetTheme(theme);
    }

    private setRowsHeight(sheet: GoogleAppsScript.Spreadsheet.Sheet,
        height: number = ThemeUtil.getCurrentTheme().rowHeight): GoogleAppsScript.Spreadsheet.Sheet {
        if (null == sheet) {
            throw new Error("Sheet not present");
        }
        if (null == height || height < BaseSheetSchema.MINIUM_ROW_HEIGHT) {
            throw new Error("Invalid Row Height");
        }
        return sheet.setRowHeights(1, sheet.getMaxRows(), height);
    }

    private ensureRowsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfRows: number = 1000): void {
        if (null == requiredNumOfRows || requiredNumOfRows < 1) {
            throw new Error("Invalid Num of row value : " + requiredNumOfRows);
        }
        if (sheet == null) {
            throw new Error("Invalid Sheet");
        }
        let existingRow: number = sheet.getMaxRows();
        if (existingRow == requiredNumOfRows) {
        } else if (existingRow > requiredNumOfRows) {
            let extraRowCount = existingRow - requiredNumOfRows;
            sheet.deleteRows(1, extraRowCount);
        } else {
            let numOfRowsToAdd = requiredNumOfRows - existingRow;
            sheet.insertRows(1, numOfRowsToAdd);
        }
    }

    private ensureColsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfCols: number = 26): void {
        if (null == requiredNumOfCols || requiredNumOfCols < 1) {
            throw new Error("Invalid Num of col value : " + requiredNumOfCols);
        }
        if (sheet == null) {
            throw new Error("Invalid Sheet");
        }
        let existingCol: number = sheet.getMaxColumns();
        if (existingCol == requiredNumOfCols) {
        } else if (existingCol > requiredNumOfCols) {
            let extraColCount = existingCol - requiredNumOfCols;
            sheet.deleteColumns(1, extraColCount);
        } else {
            let numOfColsToAdd = requiredNumOfCols - existingCol;
            sheet.insertColumns(1, numOfColsToAdd);
        }
    }

    private createOrClearSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        if (sheetName == null || sheetName.trim().length < 1) {
            throw new Error("Sheet name not present");
        }
        let sheet = this.spreadsheet.getSheetByName(sheetName);
        if (sheet == null) {
            sheet = this.spreadsheet.insertSheet(sheetName);
        } else {
            sheet.clear();
        }
        return sheet;
    }
}