import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ITheme } from "../interface/ITheme";
import { Preconditions } from "../library/Preconditions";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";

const WITH_HEADDER: true = true;
const WITHOUT_HEADDER: false = false;
const WITH_FOOTER: true = true;
const WITHOUT_FOOTER: false = false;
const TOP: true = true;
const LEFT: true = true;
const BOTTOM: true = true;
const RIGHT: true = true;
const VERTICAL: true = true;
const HORIZENTAL: true = true;

export class ThemeService {
    private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private readonly citySchema: ISchema;
    private readonly lovSchema: ISchema;
    private readonly nameSchema: ISchema;
    private readonly overviewSchema: ISchema;
    private currentTheme: ITheme;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, currentTheme: ITheme) {
        Preconditions.checkNotNull(spreadsheet);
        Preconditions.checkNotNull(currentTheme);

        this.spreadsheet = spreadsheet;
        this.currentTheme = currentTheme;
        this.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        this.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        this.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema(spreadsheet);
    }

    public setTheme(): void {
        this.setSpreadSheetTheme()
            .setCitySheetsTheme()
            .setLovSheetsTheme()
            .setNameListSheetsTheme()
            .setOverViewSheetsTheme();
    }

    private setSpreadSheetTheme(): ThemeService {
        let theme = this.spreadsheet.resetSpreadsheetTheme()
            .setFontFamily(this.currentTheme.fontFamily)
            .setConcreteColor(SpreadsheetApp.ThemeColorType.TEXT, this.buildColor(this.currentTheme.textColor));
        this.spreadsheet.setSpreadsheetTheme(theme);
        return this;
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
        this.setRowsHeight(sheet, this.currentTheme.rowHeight)
            .setTabColor(schema.HEADDER_ROW_COLOR)

            // apply sheet border and banding color
            .getRange(1, 1, schema.NUM_OF_ROWS, schema.NUM_OF_COLUMNS)
            .setBorder(TOP, LEFT, BOTTOM, RIGHT, VERTICAL, HORIZENTAL, this.currentTheme.borderColor, null)
            .applyRowBanding(this.currentTheme.bandingTheme, WITH_HEADDER, WITHOUT_FOOTER)
            .setHeaderRowColor(schema.HEADDER_ROW_COLOR)
            .setFirstRowColor(schema.FIRST_ROW_COLOR)
            .setSecondRowColor(schema.SECOND_ROW_COLOR);
        //headder
        sheet.getRange(1, 1, 1, schema.NUM_OF_COLUMNS)
            .setFontColor(schema.HEADDER_ROW_FONT_COLOR)
            .setFontSize(this.currentTheme.headderFontSize)
            .setFontWeight(this.currentTheme.headderFontWeight)
            .setHorizontalAlignment(this.currentTheme.headderFontAlignment);

        // vertical alignment
        sheet.getRange(1, 1, schema.NUM_OF_ROWS, schema.NUM_OF_COLUMNS)
            .setVerticalAlignment(this.currentTheme.fontVerticalAlignment);

        //freeze
        sheet.setFrozenRows(schema.FREEZE_ROW);
        sheet.setFrozenColumns(schema.FREEZE_COLUMN);

        sheet.setActiveSelection("A1");
        return this;
    }

    private setRowsHeight(sheet: GoogleAppsScript.Spreadsheet.Sheet, height: number): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkNotNull(height);
        Preconditions.checkArgument(height >= Sheets.MIN_ROW_HEIGHT);
        try {
            return sheet.setRowHeights(1, sheet.getMaxRows(), height);
        } catch (error) {
        }
        return sheet;
    }

    private buildColor(rbgColor: string): GoogleAppsScript.Spreadsheet.Color {
        return SpreadsheetApp.newColor()
            .setRgbColor(rbgColor)
            .build();
    }
}