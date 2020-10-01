import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";

export class SetUpService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private overviewSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private nameListSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private lovSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private citySheet: GoogleAppsScript.Spreadsheet.Sheet;

    constructor() {
        this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }


    public createOverViewSheets() {
        this.overviewSheet = this.createOrClearSheet(OverViewSheetSchema.SHEET_NAME);
    }



    public createNameListSheets() {
        this.nameListSheet = this.createOrClearSheet(NameListSheetSchema.SHEET_NAME);
    }

    public createLovSheets() {
        this.lovSheet = this.createOrClearSheet(LovSheetSchema.SHEET_NAME);
    }

    public createCitySheets() {
        this.citySheet = this.createOrClearSheet(NameListSheetSchema.SHEET_NAME);
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
        return sheet
    }
}