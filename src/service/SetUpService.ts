import { NameListSheetSchema } from "../schemas/NameListSheetSchema";

// todo
export class SetUpService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private overviewSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private nameListSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private lovSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private citySheet: GoogleAppsScript.Spreadsheet.Sheet; 
    
    constructor(){
        this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    
    public createOverViewSheets() {
        this.overviewSheet = this.spreadsheet.insertSheet(NameListSheetSchema.SHEET_NAME);
    }public createNameListSheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(NameListSheetSchema.SHEET_NAME);
    }public createLovSheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(NameListSheetSchema.SHEET_NAME);
    }
    public createCitySheets() {
        this.nameListSheet = this.spreadsheet.insertSheet(NameListSheetSchema.SHEET_NAME);
    }

    public deleteAllSheets():void{
        let sheets = this.spreadsheet.getSheets();
        if(sheets != null && sheets.length > 0){
            for(var sheet of sheets){
                this.spreadsheet.deleteSheet(sheet);
            }
        }
    }
}