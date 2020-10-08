import { DefaultSchema } from "../constants/DefaultSchema";
import { ISchema } from "../interface/ISchema";
import { ITheme } from "../interface/ITheme";
import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { ThemeUtil } from "../util/ThemeUtil";

export class ThemeService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private readonly citySchema: ISchema;
    private readonly lovSchema: ISchema;
    private readonly nameSchema: ISchema;
    private readonly overviewSchema: ISchema;
    private currentTheme: ITheme;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.spreadsheet = spreadsheet;
        this.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        this.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        this.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema(spreadsheet);
    }

    public applyBasicTheme(): void {
        this.currentTheme = ThemeUtil.getCurrentTheme();
        this.setSpreadsheetTheme();
    }

    private setSpreadsheetTheme(): ThemeService {
        let theme = ThemeUtil.getCurrentSpreadsheetTheme(this.spreadsheet.resetSpreadsheetTheme());
        this.spreadsheet.setSpreadsheetTheme(theme);
        return this.setCitySheetsTheme()
            .setLovSheetsTheme()
            .setNameListSheetsTheme()
            .setOverViewSheetsTheme();
    }

    private setCitySheetsTheme(): ThemeService {
        return this.setCommonTheme(this.citySchema);
    }
    private setLovSheetsTheme(): ThemeService {
        return this.setCommonTheme(this.lovSchema);
    }
    private setNameListSheetsTheme(): ThemeService {
        return this.setCommonTheme(this.nameSchema);
    }
    private setOverViewSheetsTheme(): ThemeService {
        return this.setCommonTheme(this.overviewSchema);
    }

    private setCommonTheme(schema: ISchema): ThemeService {
        let sheet = schema.getCurrentSheet();
        this.setRowsHeight(sheet, ThemeUtil.getCurrentTheme().rowHeight)
            .setTabColor(schema.HEADDER_ROW_COLOR)

            // apply sheet border and banding color
            .getRange(1, 1, schema.NUM_OF_ROWS, schema.NUM_OF_COLUMNS)
            .setBorder(true, true, true, true, true, true, this.currentTheme.borderColor, null)
            .applyRowBanding(this.currentTheme.defaultBandingTheme, true, false)
            .setHeaderRowColor(schema.HEADDER_ROW_COLOR)
            .setFirstRowColor(schema.FIRST_ROW_COLOR)
            .setSecondRowColor(schema.SECOND_ROW_COLOR);
        //headder
        sheet.getRange(1, 1, 1, sheet.getMaxColumns())
            .setFontColor(schema.HEADDER_ROW_FONT_COLOR)
            .setFontSize(ThemeUtil.getCurrentTheme().headderFontSize)
            .setFontWeight("bold")
            .setHorizontalAlignment("center");

        // vertical alignment
        sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setVerticalAlignment("middle");

        //freeze
        sheet.setFrozenRows(schema.FREEZE_ROW);
        sheet.setFrozenColumns(schema.FREEZE_COLUMN);

        sheet.setActiveSelection("A1");
        return this;
    }

    private setRowsHeight(sheet: GoogleAppsScript.Spreadsheet.Sheet, height: number): GoogleAppsScript.Spreadsheet.Sheet {
        if (null == height || height < DefaultSchema.minRowHeight) {
            return sheet;
        }
        try {
            return sheet.setRowHeights(1, sheet.getMaxRows(), height);
        } catch (error) {
        }
        return sheet;
    }
}