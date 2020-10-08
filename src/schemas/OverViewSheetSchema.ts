import { SheetMessage } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class OverViewSheetSchema extends BaseSheetSchema {
    // public local variable

    // public abstract variable

    // private local variable

    // public abstract methods 

    // public local methods

    // private local method
    public static readonly SHEET_NAME: string = "OVERVIEW";
    public static readonly SHEET_INDEX: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;

    public NUM_OF_ROWS: number = 10;
    public NUM_OF_COLUMNS: number = 10;

    private validSchema: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        super();
        if (sheet == null) {
            return;
        }
        this.currentSheet = sheet;
    }

    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): OverViewSheetSchema {
        return new OverViewSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): OverViewSheetSchema {
        if (null == sheet) {
            throw new Error(OverViewSheetSchema.SHEET_NAME + SheetMessage.SHEET_NOT_FOUND);
        }
        if (sheet.getName() !== OverViewSheetSchema.SHEET_NAME) {
            throw new Error(OverViewSheetSchema.SHEET_NAME + SheetMessage.INVALID_SHEET);
        }
        let newSchema = new OverViewSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(OverViewSheetSchema.SHEET_NAME + SheetMessage.INVALID_SHEET);
    }

    public static getValidOverViewSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): OverViewSheetSchema {
        if (null == spreadsheet) {
            throw new Error(OverViewSheetSchema.SHEET_NAME + SheetMessage.SHEET_NOT_FOUND);
        }
        return OverViewSheetSchema.getValidSchema(spreadsheet.getSheetByName(OverViewSheetSchema.SHEET_NAME));
    }

    public getSheetName(): string {
        return OverViewSheetSchema.SHEET_NAME;
    }

    public getHeadderValues(): Array<string> {
        return [

        ];
    }

    public getMinColWidth(index: number): number {
        return null;
    }
    public getMaxColWidth(index: number): number {
        return null;
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        if (!this.validSchema) {
            throw new Error("Invalid Schema");
        }
        return this.currentSheet;
    }

    private isSchemaValid(): boolean {
        this.validSchema = true;
        return true;
    }
}