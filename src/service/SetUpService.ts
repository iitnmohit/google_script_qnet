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
        this.overviewSheet = this.spreadsheet.insertSheet(OverViewSheetSchema.SHEET_NAME);
    }

    public createNameListSheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(NameListSheetSchema.SHEET_NAME);
    }

    public createLovSheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(LovSheetSchema.SHEET_NAME);
    }

    public createCitySheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(CitySheetSchema.SHEET_NAME);
    }

    public deleteNonQnetSheets(): void {
        let sheets = this.spreadsheet.getSheets();
        if (sheets != null && sheets.length > 0) {
            for (let sheet of sheets) {
                let sheetName = sheet.getName();
                if (sheetName === OverViewSheetSchema.SHEET_NAME
                    || sheetName === NameListSheetSchema.SHEET_NAME
                    || sheetName === LovSheetSchema.SHEET_NAME
                    || sheetName === CitySheetSchema.SHEET_NAME) {
                    continue;
                }
                this.spreadsheet.deleteSheet(sheet);
            }
        }
    }
}