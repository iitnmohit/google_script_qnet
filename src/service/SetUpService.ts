import { Cities } from "../constants/Cities";
import { Lov } from "../constants/Lov";
import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { ThemeUtil } from "../util/ThemeUtil";
import { Util } from "../util/Util";

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
        let schema = OverViewSheetSchema.getValidSchema(this.overviewSheet);
        this.endSetUpSheet(this.overviewSheet, schema);
    }

    public createNameListSheets() {
        this.nameListSheet = this.setUpSheet(NameListSheetSchema.getCompormisedSchema());
        let schema = NameListSheetSchema.getValidSchema(this.nameListSheet);
        this.fillNumbers(schema.slNoColIndex, this.nameListSheet);
        this.fillCheckBox(schema.taskColIndex, this.nameListSheet);
        this.endSetUpSheet(this.nameListSheet, schema);

        // after end setup
        this.fillCheckBox(schema.selectColIndex, this.nameListSheet);
        this.fillCheckBox(schema.updateColIndex, this.nameListSheet);
    }

    public createLovSheets() {
        this.lovSheet = this.setUpSheet(LovSheetSchema.getCompormisedSchema());
        let schema = LovSheetSchema.getValidSchema(this.lovSheet);
        this.fillColValue(Lov.list, schema.listColIndex, this.lovSheet);
        this.fillColValue(Lov.connect_up, schema.connectUpColIndex, this.lovSheet);
        this.fillColValue(Lov.info, schema.infoColIndex, this.lovSheet);
        this.fillColValue(Lov.edify, schema.edifyColIndex, this.lovSheet);
        this.fillColValue(Lov.invite, schema.inviteColIndex, this.lovSheet);
        this.fillColValue(Lov.plan, schema.planColIndex, this.lovSheet);
        this.fillColValue(Lov.closing, schema.closingColIndex, this.lovSheet);
        this.fillColValue(Lov.zone, schema.zoneColIndex, this.lovSheet);
        this.fillColValue(Lov.cast, schema.castColIndex, this.lovSheet);

        this.endSetUpSheet(this.lovSheet, schema);
    }

    public createCitySheets() {
        this.citySheet = this.setUpSheet(CitySheetSchema.getCompormisedSchema());
        let schema = CitySheetSchema.getValidSchema(this.citySheet);
        this.fillColValue(Cities.list, schema.locationColIndex, this.citySheet);

        this.endSetUpSheet(this.citySheet, schema);
    }

    private fillNumbers(colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean {
        try {
            let sourceRange = sheet.getRange(2, colIndex, 2, 1);
            sourceRange.setValues([[1], [2]]);
            let destRange = sheet.getRange(2, colIndex, sheet.getMaxRows() - 1, 1);
            sourceRange.autoFill(destRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
            destRange.setHorizontalAlignment("left");
        } catch (error) {
            Logger.log(error);
            return false;
        }
        return true;
    }

    private fillCheckBox(colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean {
        try {
            sheet.getRange(2, colIndex, sheet.getMaxRows() - 1, 1).insertCheckboxes();
            sheet.setColumnWidth(colIndex, ThemeUtil.getCurrentTheme().checkBoxColWidth);
        } catch (error) {
            Logger.log(error);
            return false;
        }
        return true;
    }

    private fillColValue<T>(list: Array<T>, colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean {
        if (list != null && list.length > 0) {
            try {
                sheet.getRange(2, colIndex, list.length, 1).setValues(Util.arrayOfArray(list));
            } catch (error) {
                Logger.log(error);
                return false;
            }
            return true;
        }
    }

    private endSetUpSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet, schema: BaseSheetSchema): void {
        try {
            let numOfCols = sheet.getMaxColumns();
            sheet.autoResizeColumns(1, numOfCols);
            for (let i = 1; i <= numOfCols; i++) {
                let colWidth = sheet.getColumnWidth(i);
                colWidth = colWidth + ThemeUtil.getCurrentTheme().colWidthOffset;
                let maxColWidth = schema.getMaxColWidth(i);
                if (maxColWidth !== null && maxColWidth < colWidth) {
                    colWidth = maxColWidth;
                }
                let minColWidth = schema.getMinColWidth(i);
                if (minColWidth !== null && minColWidth > colWidth) {
                    colWidth = minColWidth;
                }
                sheet.setColumnWidth(i, colWidth);
            }
        } catch (error) {
            Logger.log(error);
        }
    }

    private setUpSheet(schema: BaseSheetSchema): GoogleAppsScript.Spreadsheet.Sheet {
        let sheet = this.createOrClearSheet(schema.getSheetName());
        // set rows and column
        this.ensureRowsCount(sheet, schema.DEFAULT_ROW_COUNT);
        this.ensureColsCount(sheet, schema.DEFAULT_COL_COUNT);

        //set row height and tab color
        this.setRowsHeight(sheet, schema.ROW_HEIGHT);
        sheet.setTabColor(schema.HEADDER_ROW_COLOR);

        // apply sheet border and banding color
        sheet.getRange(1, 1, schema.DEFAULT_ROW_COUNT, schema.DEFAULT_COL_COUNT)
            .setBorder(true, true, true, true, true, true, ThemeUtil.getCurrentTheme().borderColor, null)
            .applyRowBanding(ThemeUtil.getCurrentTheme().defaultBandingTheme, true, false)
            .setHeaderRowColor(schema.HEADDER_ROW_COLOR)
            .setFirstRowColor(schema.FIRST_ROW_COLOR)
            .setSecondRowColor(schema.SECOND_ROW_COLOR);

        // set headder row value and alignment
        let headderArray = schema.getHeadderValues();
        if (headderArray.length > schema.DEFAULT_COL_COUNT) {
            throw new Error("Failed creating schema, for " + schema.getSheetName() +
                " sheet headder count is more than column count.");
        }
        if (headderArray.length > 0) {
            sheet.getRange(1, 1, 1, headderArray.length)
                .setValues([headderArray])
                .setFontColor(schema.HEADDER_ROW_FONT_COLOR)
                .setFontSize(ThemeUtil.getCurrentTheme().headderFontSize)
                .setFontWeight("bold")
                .setHorizontalAlignment("center");
        }

        //freeze
        sheet.setFrozenRows(1);
        sheet.setFrozenColumns(schema.FREEZE_COLUMN);

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
            sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).removeCheckboxes();
        }
        return sheet;
    }
}