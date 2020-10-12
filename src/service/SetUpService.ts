import { Cities } from "../constants/Cities";
import { Lov } from "../constants/Lov";
import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ISheet, ITable } from "../interface/ISheet";
import { InvalidConfigurationException, ServerException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { ThemeUtil } from "../util/ThemeUtil";
import { Util } from "../util/Util";

export class SetUpService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

    constructor () {
        this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    public createAllSheets(): GoogleAppsScript.Spreadsheet.Spreadsheet {
        this.spreadsheet.resetSpreadsheetTheme();
        this.clearNameRange()
            .createOverViewSheets()
            .createNameListSheets()
            .createLovSheets()
            .createCitySheets();
        return this.spreadsheet;
    }

    public deleteNonQnetSheets(): void {
        let sheets = this.spreadsheet.getSheets();
        let totalNumOfSheets = sheets.length;
        let numOfSheetDeleted = 0;
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

    private createOverViewSheets(): SetUpService {
        let overviewSheet = this.startSetUpOfSheet(Sheets.OVERVIEW);
        this.setupTable(overviewSheet, Sheets.OVERVIEW.TABLES.TABLE_OVERALL)
            .setupTable(overviewSheet, Sheets.OVERVIEW.TABLES.TABLE_LIST_WISE);
        let schema = OverViewSheetSchema.getValidSchema(overviewSheet);
        return this.setupColWidth(schema);
    }
    private setupTable(sheet: GoogleAppsScript.Spreadsheet.Sheet, table: ITable): SetUpService {
        Preconditions.checkNotNull(sheet);
        if (Predicates.IS_NULL.test(table)) {
            return;
        }
        if (table.APPEND === "row") {
            //append in 1st row
        } else {
            // append in new row below
        }



        return this;
    }

    private createNameListSheets(): SetUpService {
        let nameListSheet = this.startSetUpOfSheet(Sheets.NAMELIST);
        let schema = NameListSheetSchema.getValidSchema(nameListSheet);
        return this.fillNumbers(schema.slNoColIndex, schema)
            .fillCheckBox(schema.doColIndex, schema)
            .fillCheckBox(schema.selectColIndex, schema)
            .setupColWidth(schema);
    }

    private createLovSheets(): SetUpService {
        let lovSheet = this.startSetUpOfSheet(Sheets.LOV);
        let schema = LovSheetSchema.getValidSchema(lovSheet);
        return this.fillColValue(Lov.LIST, schema.listColIndex, lovSheet)
            .fillCheckBox(schema.strikeThroughColIndex, schema)
            .fillColValue(Lov.CONNECT_UP, schema.connectUpColIndex, lovSheet)
            .fillColValue(Lov.INFO, schema.infoColIndex, lovSheet)
            .fillColValue(Lov.EDIFY, schema.edifyColIndex, lovSheet)
            .fillColValue(Lov.INVITE, schema.inviteColIndex, lovSheet)
            .fillColValue(Lov.PLAN, schema.planColIndex, lovSheet)
            .fillColValue(Lov.CLOSING, schema.closingColIndex, lovSheet)
            .fillColValue(Lov.ZONE, schema.zoneColIndex, lovSheet)
            .fillColValue(Lov.CAST, schema.castColIndex, lovSheet)
            .setupColWidth(schema);
    }

    private createCitySheets(): SetUpService {
        let citySheet = this.startSetUpOfSheet(Sheets.CITY);
        let schema = CitySheetSchema.getValidSchema(citySheet);
        return this.fillColValue(Cities.LIST, schema.locationColIndex, citySheet)
            .setupColWidth(schema);
    }

    private fillNumbers(colIndex: number, schema: ISchema): SetUpService {
        try {
            let sheet = schema.getCurrentSheet();
            let sourceRange = sheet.getRange(2, colIndex, 2, 1);
            sourceRange.setValues([[1], [2]]);
            let destRange = sheet.getRange(2, colIndex, schema.NUM_OF_ROWS - 1, 1);
            sourceRange.autoFill(destRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
            destRange.setHorizontalAlignment("left");
        } catch (error) {
            throw new ServerException(error);
        }
        return this;
    }

    private fillCheckBox(colIndex: number, schema: ISchema): SetUpService {
        try {
            schema.getCurrentSheet()
                .getRange(2, colIndex, schema.NUM_OF_ROWS - 1, 1)
                .insertCheckboxes();
        } catch (error) {
            throw new ServerException(error);
        }
        return this;
    }

    private fillColValue(list: Array<string>, colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): SetUpService {
        Preconditions.checkNotNull(list);
        Preconditions.checkNotNull(sheet);
        Preconditions.checkPositive(colIndex);
        if (Predicates.IS_LIST_EMPTY.test(list)) {
            return this;
        }
        try {
            sheet.getRange(2, colIndex, list.length, 1).setValues(Util.arrayOfArray(list));
        } catch (error) {
            throw new ServerException(error);
        }
        return this;
    }

    private setupColWidth(schema: ISchema): SetUpService {
        Preconditions.checkNotNull(schema);
        try {
            let sheet = schema.getCurrentSheet();
            sheet.autoResizeColumns(1, schema.NUM_OF_COLUMNS);
            for (let i = 1; i <= schema.NUM_OF_COLUMNS; i++) {
                let colWidth = sheet.getColumnWidth(i);
                colWidth = colWidth + ThemeUtil.getCurrentTheme().colWidthOffset;
                let maxColWidth = schema.getMaxColWidth(i);
                let minColWidth = schema.getMinColWidth(i);

                if (maxColWidth !== null && maxColWidth < colWidth) {
                    colWidth = maxColWidth;
                }
                if (minColWidth !== null && minColWidth > colWidth) {
                    colWidth = minColWidth;
                }
                sheet.setColumnWidth(i, colWidth);
            }
        } catch (error) {
            throw new ServerException(error);
        }
        return this;
    }

    private startSetUpOfSheet(iSheet: ISheet): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkNotNull(iSheet);
        let sheet = this.createOrClearSheet(iSheet.NAME);
        // set rows and column
        this.ensureRowsCount(sheet, iSheet.NUM_OF.ROWS)
            .ensureColsCount(sheet, iSheet.NUM_OF.COLUMNS);

        // set headder row value and alignment
        if (Predicates.IS_NOT_NULL.test(iSheet.COLUMN)) {
            let headderArray = Object.values<string>(iSheet.COLUMN);
            if (headderArray.length > iSheet.NUM_OF.COLUMNS) {
                throw new InvalidConfigurationException(Preconditions
                    .format(Msg.SHEET.HEADDER_MORE_THAN_COLUMN, iSheet.NAME));
            }
            if (Predicates.IS_LIST_NOT_EMPTY.test(headderArray)) {
                sheet.getRange(1, 1, 1, headderArray.length)
                    .setValues([headderArray]);
            }
        }
        sheet.setActiveSelection("A1");
        return sheet;
    }

    private ensureRowsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfRows: number = Sheets.DEFAULT_NUM_OF_ROWS): SetUpService {
        Preconditions.checkNotNull(sheet, Msg.SHEET.INVALID_SHEET);
        Preconditions.checkPositive(requiredNumOfRows, Msg.SHEET.INVALI_ROW_COUNT, requiredNumOfRows);

        let existingRow: number = sheet.getMaxRows();
        if (existingRow == requiredNumOfRows) {
        } else if (existingRow > requiredNumOfRows) {
            let extraRowCount = existingRow - requiredNumOfRows;
            sheet.deleteRows(1, extraRowCount);
        } else {
            let numOfRowsToAdd = requiredNumOfRows - existingRow;
            sheet.insertRows(1, numOfRowsToAdd);
        }
        return this;
    }

    private ensureColsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfCols: number = Sheets.DEFAULT_NUM_OF_COLS): SetUpService {
        Preconditions.checkNotNull(sheet, Msg.SHEET.INVALID_SHEET);
        Preconditions.checkPositive(requiredNumOfCols, Msg.SHEET.INVALI_COL_COUNT, requiredNumOfCols);
        let existingCol: number = sheet.getMaxColumns();
        if (existingCol == requiredNumOfCols) {
        } else if (existingCol > requiredNumOfCols) {
            let extraColCount = existingCol - requiredNumOfCols;
            sheet.deleteColumns(1, extraColCount);
        } else {
            let numOfColsToAdd = requiredNumOfCols - existingCol;
            sheet.insertColumns(1, numOfColsToAdd);
        }
        return this;
    }

    private createOrClearSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkNotBlank(sheetName, Msg.SHEET.INVALID_SHEET_NAME);
        let sheet = this.spreadsheet.getSheetByName(sheetName);
        if (sheet == null) {
            sheet = this.spreadsheet.insertSheet(sheetName);
        } else {
            sheet.clear();
            sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).removeCheckboxes()
                .clear({
                    commentsOnly: true,
                    contentsOnly: true,
                    formatOnly: true,
                    validationsOnly: true,
                    skipFilteredRows: false
                })
                .clearDataValidations()
                .clearNote()
                .clear();
            sheet.clearConditionalFormatRules();
            sheet.clearNotes();
            sheet.setFrozenRows(0);
            sheet.setFrozenColumns(0);
        }
        return sheet;
    }

    private clearNameRange(): SetUpService {
        let namedRanges = this.spreadsheet.getNamedRanges();
        for (let namerange of namedRanges) {
            namerange.remove();
        }
        return this;
    }
}