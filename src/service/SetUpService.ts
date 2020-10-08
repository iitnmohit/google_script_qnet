import { Cities } from "../constants/Cities";
import { Lov } from "../constants/Lov";
import { ISchema } from "../interface/ISchema";
import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
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
        this.createOverViewSheets()
            .createNameListSheets()
            .createLovSheets()
            .createCitySheets();
        return this.spreadsheet;
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

    private createOverViewSheets(): SetUpService {
        var overviewSheet = this.startSetUpOfSheet(OverViewSheetSchema.getCompormisedSchema());
        let schema = OverViewSheetSchema.getValidSchema(overviewSheet);
        return this.endSetUpOfSheet(schema);
    }

    private createNameListSheets(): SetUpService {
        var nameListSheet = this.startSetUpOfSheet(NameListSheetSchema.getCompormisedSchema());
        let schema = NameListSheetSchema.getValidSchema(nameListSheet);
        return this.fillNumbers(schema.slNoColIndex, nameListSheet)
            .fillCheckBox(schema.taskColIndex, nameListSheet)
            .fillCheckBox(schema.selectColIndex, nameListSheet)
            .fillCheckBox(schema.updateColIndex, nameListSheet)
            .endSetUpOfSheet(schema);
    }

    private createLovSheets(): SetUpService {
        var lovSheet = this.startSetUpOfSheet(LovSheetSchema.getCompormisedSchema());
        let schema = LovSheetSchema.getValidSchema(lovSheet);
        return this.fillColValue(Lov.list, schema.listColIndex, lovSheet)
            .fillColValue(Lov.connect_up, schema.connectUpColIndex, lovSheet)
            .fillColValue(Lov.info, schema.infoColIndex, lovSheet)
            .fillColValue(Lov.edify, schema.edifyColIndex, lovSheet)
            .fillColValue(Lov.invite, schema.inviteColIndex, lovSheet)
            .fillColValue(Lov.plan, schema.planColIndex, lovSheet)
            .fillColValue(Lov.closing, schema.closingColIndex, lovSheet)
            .fillColValue(Lov.zone, schema.zoneColIndex, lovSheet)
            .fillColValue(Lov.cast, schema.castColIndex, lovSheet)
            .endSetUpOfSheet(schema);
    }

    private createCitySheets(): SetUpService {
        var citySheet = this.startSetUpOfSheet(CitySheetSchema.getCompormisedSchema());
        let schema = CitySheetSchema.getValidSchema(citySheet);
        return this.fillColValue(Cities.list, schema.locationColIndex, citySheet)
            .endSetUpOfSheet(schema);
    }

    private fillNumbers(colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): SetUpService {
        try {
            let sourceRange = sheet.getRange(2, colIndex, 2, 1);
            sourceRange.setValues([[1], [2]]);
            let destRange = sheet.getRange(2, colIndex, sheet.getMaxRows() - 1, 1);
            sourceRange.autoFill(destRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
            destRange.setHorizontalAlignment("left");
        } catch (error) {
            Logger.log(error);
        }
        return this;
    }

    private fillCheckBox(colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): SetUpService {
        try {
            sheet.getRange(2, colIndex, sheet.getMaxRows() - 1, 1).insertCheckboxes();
        } catch (error) {
            Logger.log(error);
        }
        return this;
    }

    private fillColValue<T>(list: Array<T>, colIndex: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): SetUpService {
        if (list != null && list.length > 0) {
            try {
                sheet.getRange(2, colIndex, list.length, 1).setValues(Util.arrayOfArray(list));
            } catch (error) {
                Logger.log(error);
            }
        }
        return this;
    }

    private endSetUpOfSheet(schema: ISchema): SetUpService {
        try {
            let numOfCols = schema.getCurrentSheet().getMaxColumns();
            schema.getCurrentSheet().autoResizeColumns(1, numOfCols);
            for (let i = 1; i <= numOfCols; i++) {
                let colWidth = schema.getCurrentSheet().getColumnWidth(i);
                colWidth = colWidth + ThemeUtil.getCurrentTheme().colWidthOffset;
                let maxColWidth = schema.getMaxColWidth(i);
                if (maxColWidth !== null && maxColWidth < colWidth) {
                    colWidth = maxColWidth;
                }
                let minColWidth = schema.getMinColWidth(i);
                if (minColWidth !== null && minColWidth > colWidth) {
                    colWidth = minColWidth;
                }
                schema.getCurrentSheet().setColumnWidth(i, colWidth);
            }
        } catch (error) {
            Logger.log(error);
        }
        return this;
    }

    private startSetUpOfSheet(schema: ISchema): GoogleAppsScript.Spreadsheet.Sheet {
        let sheet = this.createOrClearSheet(schema.getSheetName());
        // set rows and column
        this.ensureRowsCount(sheet, schema.NUM_OF_ROWS)
            .ensureColsCount(sheet, schema.NUM_OF_COLUMNS);

        // set headder row value and alignment
        let headderArray = schema.getHeadderValues();
        if (headderArray.length > schema.NUM_OF_COLUMNS) {
            throw new Error("Failed creating schema, for " + schema.getSheetName() +
                " sheet headder count is more than column count.");
        }
        if (headderArray.length > 0) {
            sheet.getRange(1, 1, 1, headderArray.length)
                .setValues([headderArray]);
        }

        sheet.setActiveSelection("A1");
        return sheet;
    }

    private ensureRowsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfRows: number = 1000): SetUpService {
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
        return this;
    }

    private ensureColsCount(sheet: GoogleAppsScript.Spreadsheet.Sheet, requiredNumOfCols: number = 26): SetUpService {
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
        return this;
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