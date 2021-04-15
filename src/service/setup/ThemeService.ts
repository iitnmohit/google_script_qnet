import { Sheets } from "../../constants/Sheets";
import { ISchema } from "../../interface/ISchema";
import { ITable } from "../../interface/ISheet";
import { ITheme } from "../../interface/ITheme";
import { Preconditions } from "../../library/Preconditions";
import { Predicates } from "../../library/Predicates";
import { CalenderSheetSchema } from "../../schemas/CalenderSheetSchema";
import { CitySheetSchema } from "../../schemas/CitySheetSchema";
import { ContactsSheetSchema } from "../../schemas/ContactsSheetSchema";
import { LovSheetSchema } from "../../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../../schemas/OverViewSheetSchema";
import { Util } from "../../util/Util";

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
    private readonly contactSchema: ContactsSheetSchema;
    private readonly calenderSchema: CalenderSheetSchema;
    private readonly citySchema: ISchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;
    private readonly overviewSchema: ISchema;
    private currentTheme: ITheme;

    constructor (currentTheme: ITheme) {
        Preconditions.checkNotNull(currentTheme);

        this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        this.currentTheme = currentTheme;
        this.contactSchema = ContactsSheetSchema.getValidContactsSchema();
        this.calenderSchema = CalenderSheetSchema.getValidCalenderSchema();
        this.citySchema = CitySheetSchema.getValidCitySchema();
        this.lovSchema = LovSheetSchema.getValidLovSchema();
        this.nameSchema = NameListSheetSchema.getValidNameListSchema();
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema();
    }

    public setTheme(): void {
        this.setSpreadSheetTheme()
            .setContactSheetTheme()
            .setCalenderSheetTheme()
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

    private setContactSheetTheme(): ThemeService {
        this.setCommonTheme(this.contactSchema);

        //conditional formatting
        let sheet = this.contactSchema.SPREADSHEET;
        let selectColChar = Util.getColumnLetter(this.contactSchema.getColIndexByName(Sheets.COLUMN_NAME.DO));
        let cfFormulaForDo = `$${selectColChar}2=true`;
        let rangeAll = sheet.getRange(2, 1, this.contactSchema.NUM_OF_ROWS - 1, this.contactSchema.NUM_OF_COLUMNS);

        this.applyConditionalForatting(sheet, cfFormulaForDo, rangeAll, false,
            this.currentTheme.DO_SELECT_BG_COLOR, this.currentTheme.DO_SELECT_FONT_COLOR);
        return this;
    }

    private setCalenderSheetTheme(): ThemeService {
        this.setCommonTheme(this.calenderSchema);

        //conditional formatting
        let sheet = this.calenderSchema.SPREADSHEET;
        let selectColChar = Util.getColumnLetter(this.calenderSchema.getColIndexByName(Sheets.COLUMN_NAME.DO));
        let conditionForStrikeThrough = `$${selectColChar}2=true`;
        let rangeAll = sheet.getRange(2, 1, this.calenderSchema.NUM_OF_ROWS - 1, this.calenderSchema.NUM_OF_COLUMNS);
        rangeAll.setWrap(true).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

        this.applyConditionalForatting(sheet, conditionForStrikeThrough, rangeAll,
            false, null, null, true, true, false);
        return this;
    }
    private setCitySheetsTheme(): ThemeService {
        return this.setCommonTheme(this.citySchema);
    }
    private setLovSheetsTheme(): ThemeService {
        this.setCommonTheme(this.lovSchema);

        //conditional formatting
        let sheet = this.lovSchema.SPREADSHEET;
        let selectColChar = Util.getColumnLetter(this.lovSchema.getColIndexByName(Sheets.COLUMN_NAME.SELECT));
        let conditionForStrikeThrough = `$${selectColChar}2=true`;
        let rangeLists = sheet.getRange(2, this.lovSchema.getColIndexByName(Sheets.COLUMN_NAME.LIST), this.lovSchema.NUM_OF_ROWS - 1, 1);

        this.applyConditionalForatting(sheet, conditionForStrikeThrough, rangeLists, true);
        return this;
    }
    private setNameListSheetsTheme(): ThemeService {
        this.setCommonTheme(this.nameSchema);
        // conditional formatting
        let sheet = this.nameSchema.SPREADSHEET;
        let rangeAll = sheet.getRange(2, 1, this.nameSchema.NUM_OF_ROWS - 1, this.nameSchema.NUM_OF_COLUMNS);
        let rangeNames = sheet.getRange(2, this.nameSchema.getColIndexByName(Sheets.COLUMN_NAME.NAME), this.nameSchema.NUM_OF_ROWS - 1, 1);

        let selectColChar = Util.getColumnLetter(this.nameSchema.getColIndexByName(Sheets.COLUMN_NAME.SELECT));
        let cfFormulaForSelectRow = `$${selectColChar}2=true`;
        let doColChar = Util.getColumnLetter(this.nameSchema.getColIndexByName(Sheets.COLUMN_NAME.DO));
        let followUpColChar = Util.getColumnLetter(this.nameSchema.getColIndexByName(Sheets.COLUMN_NAME.FOLLOW_UP));
        let cfFormulaForTaskRow = `$${doColChar}2=true`;
        let cfFormulaForFollowUpDateIsToday = `${followUpColChar}2=TODAY()`;
        let cfFormulaForStrikeThrough = this.getCfFormulaForStrikeThrough();

        this.applyConditionalForatting(sheet, cfFormulaForFollowUpDateIsToday,
            rangeNames, false, this.currentTheme.nameSheetTodayDateHighlightColor);
        this.applyConditionalForatting(sheet, `AND(${cfFormulaForTaskRow},${cfFormulaForStrikeThrough})`,
            rangeNames, true, this.currentTheme.DO_SELECT_BG_COLOR,
            this.currentTheme.DO_SELECT_FONT_COLOR);
        this.applyConditionalForatting(sheet, cfFormulaForTaskRow, rangeAll, false,
            this.currentTheme.DO_SELECT_BG_COLOR, this.currentTheme.DO_SELECT_FONT_COLOR);
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
        let lovListCol = Util.getColumnA1Notation(this.lovSchema.getColIndexByName(Sheets.COLUMN_NAME.LIST), 2, this.lovSchema.ISHEET.NAME);//Lists!A2:A
        let lovSelectCol = Util.getColumnA1Notation(this.lovSchema.getColIndexByName(Sheets.COLUMN_NAME.SELECT), 2, this.lovSchema.ISHEET.NAME);//Lists!B2:B
        let nameListColChar = Util.getColumnLetter(this.nameSchema.getColIndexByName(Sheets.COLUMN_NAME.LIST));
        return `EQ(IFERROR(FILTER(INDIRECT("${lovSelectCol}"),INDIRECT("${lovListCol}")=${nameListColChar}2),FALSE),TRUE)`;
    }

    private applyConditionalForatting(
        sheet: GoogleAppsScript.Spreadsheet.Sheet,
        condition: string,
        range: GoogleAppsScript.Spreadsheet.Range,
        isStrikeThrough: boolean = false,
        bgColor: string = null,
        fontColor = null,
        isUnderLine: boolean = false,
        isItalic: boolean = false,
        isBold: boolean = false
    ): void {
        let builder = SpreadsheetApp.newConditionalFormatRule()
            .whenFormulaSatisfied(`=${condition}`)
            .setRanges([range]);
        if (isStrikeThrough) {
            builder.setStrikethrough(true);
        }
        if (isUnderLine) {
            builder.setUnderline(true);
        }
        if (isItalic) {
            builder.setItalic(true);
        }
        if (isBold) {
            builder.setBold(true);
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
        let sheet = schema.SPREADSHEET;
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
        sheet.setFrozenRows(schema.ISHEET.FREEZE.ROW);
        sheet.setFrozenColumns(schema.ISHEET.FREEZE.COLUMN);

        sheet.setActiveSelection("A1");
        return this;
    }

    private setRowsHeight(schema: ISchema, height: number): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkNotNull(height);
        Preconditions.checkArgument(height >= Sheets.MIN_ROW_HEIGHT);
        let sheet = schema.SPREADSHEET;
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