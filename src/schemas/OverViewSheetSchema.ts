import { Sheets } from "../constants/Sheets";
import { Msg } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";
import { ISheet } from "../interface/ISheet";

export class OverViewSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.OVERVIEW.NAME;
    public static readonly SHEET_INDEX: number = Sheets.OVERVIEW.INDEX;

    // public local variable

    // public abstract variable
    public ISHEET: ISheet = Sheets.OVERVIEW;
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
        this.isThisSchemaValid = true;
        return true;
    }
}