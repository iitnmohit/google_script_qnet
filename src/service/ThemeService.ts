import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ITable } from "../interface/ISheet";
import { ITheme } from "../interface/ITheme";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { Util } from "../util/Util";

const WITH_HEADDER: true = true;
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
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;
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
        this.setCommonTheme(this.lovSchema);

        //conditional formatting
        let sheet = this.lovSchema.getCurrentSheet();
        let selectColChar = Util.getColumnLetter(this.lovSchema.strikeThroughColIndex);
        let conditionForStrikeThrough = `$${selectColChar}2=true`;
        let rangeLists = sheet.getRange(2, this.lovSchema.listColIndex, this.lovSchema.NUM_OF_ROWS - 1, 1);

        this.applyConditionalForatting(sheet, conditionForStrikeThrough, rangeLists, true);
        return this;
    }
    private setNameListSheetsTheme(): ThemeService {
        this.setCommonTheme(this.nameSchema);
        // conditional formatting
        let sheet = this.nameSchema.getCurrentSheet();
        let rangeAll = sheet.getRange(2, 1, this.nameSchema.NUM_OF_ROWS - 1, this.nameSchema.NUM_OF_COLUMNS);
        let rangeNames = sheet.getRange(2, this.nameSchema.nameColIndex, this.nameSchema.NUM_OF_ROWS - 1, 1);

        let selectColChar = Util.getColumnLetter(this.nameSchema.selectColIndex);
        let cfFormulaForSelectRow = `$${selectColChar}2=true`;
        let doColChar = Util.getColumnLetter(this.nameSchema.doColIndex);
        let cfFormulaForTaskRow = `$${doColChar}2=true`;
        let cfFormulaForStrikeThrough = this.getCfFormulaForStrikeThrough();

        this.applyConditionalForatting(sheet, `AND(${cfFormulaForTaskRow},${cfFormulaForStrikeThrough})`,
            rangeNames, true, this.currentTheme.nameSheetDoSelectBgColor,
            this.currentTheme.nameSheetDoSelectFontColor);
        this.applyConditionalForatting(sheet, cfFormulaForTaskRow, rangeAll, false,
            this.currentTheme.nameSheetDoSelectBgColor, this.currentTheme.nameSheetDoSelectFontColor);
        this.applyConditionalForatting(sheet, `AND(${cfFormulaForSelectRow},${cfFormulaForStrikeThrough})`,
            rangeNames, true, this.currentTheme.nameSheetSelectBgColor,
            this.currentTheme.nameSheetSelectFontColor);
        this.applyConditionalForatting(sheet, cfFormulaForSelectRow, rangeAll, false,
            this.currentTheme.nameSheetSelectBgColor, this.currentTheme.nameSheetSelectFontColor);
        this.applyConditionalForatting(sheet, cfFormulaForStrikeThrough, rangeNames, true);
        return this;
    }

    private setOverViewSheetsTheme(): ThemeService {
        return this.setCommonTheme(this.overviewSchema, true);
    }

    private getCfFormulaForStrikeThrough(): string {
        let lovListCol = Util.getColumnA1Notation(this.lovSchema.listColIndex, 2, this.lovSchema.getSheetName());//Lists!A2:A
        let lovSelectCol = Util.getColumnA1Notation(this.lovSchema.strikeThroughColIndex, 2, this.lovSchema.getSheetName());//Lists!B2:B
        let nameListColChar = Util.getColumnLetter(this.nameSchema.listColIndex);
        return `EQ(IFERROR(FILTER(INDIRECT("${lovSelectCol}"),INDIRECT("${lovListCol}")=${nameListColChar}2),FALSE),TRUE)`;
    }

    private applyConditionalForatting(
        sheet: GoogleAppsScript.Spreadsheet.Sheet,
        condition: string,
        range: GoogleAppsScript.Spreadsheet.Range,
        isStrikeThrough: boolean = false,
        bgColor: string = null,
        fontColor = null
    ): void {
        let builder = SpreadsheetApp.newConditionalFormatRule()
            .whenFormulaSatisfied(`=${condition}`)
            .setRanges([range]);
        if (isStrikeThrough) {
            builder.setStrikethrough(true);
        }
        if (Predicates.IS_NOT_BLANK.test(bgColor)) {
            builder.setBackground(bgColor);
        }
        if (Predicates.IS_NOT_BLANK.test(fontColor)) {
            builder.setFontColor(fontColor);
        }
        let rules = sheet.getConditionalFormatRules();
        rules.push(builder.build());
        sheet.setConditionalFormatRules(rules);
    }

    private setCommonTheme(schema: ISchema, tableSheet: boolean = false): ThemeService {
        let sheet = schema.getCurrentSheet();
        let fullSheetRange = this.setRowsHeight(schema, this.currentTheme.rowHeight)
            .setTabColor(schema.HEADDER_ROW_COLOR)
            .setHiddenGridlines(true)

            // apply sheet border and banding color
            .getRange(1, 1, schema.NUM_OF_ROWS, schema.NUM_OF_COLUMNS)
            .setVerticalAlignment(this.currentTheme.fontVerticalAlignment);
        if (tableSheet) {
            let tableArray = Object.values<ITable>(schema.ISHEET.TABLES);
            if (Predicates.IS_LIST_NOT_EMPTY.test(tableArray)) {
                for (let itable of tableArray) {
                    let tableRange = sheet.getRange(itable.INDEX.row, itable.INDEX.col, itable.HEIGHT, itable.WIDTH)
                        .setBorder(TOP, LEFT, BOTTOM, RIGHT, VERTICAL, HORIZENTAL, this.currentTheme.borderColor, null);
                    // top headder
                    let tableHasTopHeadder = Predicates.IS_LIST_NOT_EMPTY.test(itable.HEADDER.TOP.VALUES);
                    tableRange.applyRowBanding(this.currentTheme.bandingTheme, tableHasTopHeadder, WITHOUT_FOOTER)
                        .setFirstRowColor(schema.FIRST_ROW_COLOR)
                        .setSecondRowColor(schema.SECOND_ROW_COLOR);
                    if (tableHasTopHeadder) {
                        sheet.getRange(itable.INDEX.row, itable.INDEX.col, 1, itable.WIDTH)
                            .setBackground(schema.HEADDER_ROW_COLOR)
                            .setFontColor(schema.HEADDER_ROW_FONT_COLOR)
                            .setFontSize(this.currentTheme.headderFontSize)
                            .setFontWeight(this.currentTheme.headderFontWeight)
                            .setHorizontalAlignment(this.currentTheme.headderFontAlignment);
                    }
                    // left headder
                    let tableHasLeftHeadder = Predicates.IS_LIST_NOT_EMPTY.test(itable.HEADDER.LEFT.VALUES);
                    if (tableHasLeftHeadder) {
                        sheet.getRange(itable.INDEX.row, itable.INDEX.col, itable.HEIGHT, 1)
                            .setBackground(schema.HEADDER_ROW_COLOR)
                            .setFontColor(schema.HEADDER_ROW_FONT_COLOR)
                            .setFontSize(this.currentTheme.headderFontSize)
                            .setFontWeight(this.currentTheme.headderFontWeight)
                            .setHorizontalAlignment("left");
                    }

                }
            }
        } else {
            fullSheetRange.setBorder(TOP, LEFT, BOTTOM, RIGHT, VERTICAL, HORIZENTAL, this.currentTheme.borderColor, null)
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
        }

        //freeze
        sheet.setFrozenRows(schema.FREEZE_ROW);
        sheet.setFrozenColumns(schema.FREEZE_COLUMN);

        sheet.setActiveSelection("A1");
        return this;
    }

    private setRowsHeight(schema: ISchema, height: number): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkNotNull(height);
        Preconditions.checkArgument(height >= Sheets.MIN_ROW_HEIGHT);
        let sheet = schema.getCurrentSheet();
        try {
            return sheet.setRowHeights(1, schema.NUM_OF_ROWS, height);
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