import { ISchema } from "../interface/ISchema";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseSheetSchema } from "./BaseSheetSchema";

export class OverViewSheetSchema extends BaseSheetSchema {
    public static readonly SHEET_NAME: string = "OVERVIEW";
    public static readonly SHEET_INDEX: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().overviewTableSecondRowColor;

    public DEFAULT_ROW_COUNT: number = 10;
    public DEFAULT_COL_COUNT: number = 10;

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
            throw new Error(OverViewSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_SHEET_EQ_NULL);
        }
        if (sheet.getName() !== OverViewSheetSchema.SHEET_NAME) {
            throw new Error(OverViewSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_INVALID_SHEET_NAME);
        }
        let newSchema = new OverViewSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new Error(OverViewSheetSchema.SHEET_NAME + BaseSheetSchema.MSG_ERROR_INVALID_SHEET);
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