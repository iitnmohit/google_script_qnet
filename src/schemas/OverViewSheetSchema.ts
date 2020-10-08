import { DefaultSchema } from "../constants/DefaultSchema";
import { SheetMessage } from "../constants/Message";
import { ISchema } from "../interface/ISchema";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { ThemeUtil } from "../util/ThemeUtil";

export class OverViewSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = DefaultSchema.OVERVIEW.NAME;
    public static readonly SHEET_INDEX: number = DefaultSchema.OVERVIEW.INDEX;

    // public local variable

    // public abstract variable
    public NUM_OF_ROWS: number = DefaultSchema.OVERVIEW.NUM_OF.ROWS;
    public NUM_OF_COLUMNS: number = DefaultSchema.OVERVIEW.NUM_OF.COLUMNS;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;

    public FREEZE_ROW: number = DefaultSchema.OVERVIEW.FREEZE.ROW;
    public FREEZE_COLUMN: number = DefaultSchema.OVERVIEW.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
    }

    // static method
    public static getCompormisedSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet = null): OverViewSheetSchema {
        return new OverViewSheetSchema(sheet);
    }

    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): OverViewSheetSchema {
        Preconditions.checkNotNull(sheet, SheetMessage.SHEET_NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === OverViewSheetSchema.SHEET_NAME,
            SheetMessage.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME);

        let newSchema = new OverViewSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Preconditions.format(SheetMessage.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME));
    }

    public static getValidOverViewSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): OverViewSheetSchema {
        Preconditions.checkNotNull(spreadsheet, SheetMessage.SHEET_NOT_FOUND, OverViewSheetSchema.SHEET_NAME);
        return OverViewSheetSchema.getValidSchema(spreadsheet.getSheetByName(OverViewSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
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
        Preconditions.checkArgument(this.isThisSchemaValid, SheetMessage.INVALID_SHEET, OverViewSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        this.isThisSchemaValid = true;
        return true;
    }
}