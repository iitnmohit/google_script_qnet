import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ISchema } from "../interface/ISchema";
import { ISheet } from "../interface/ISheet";
import { InvalidSheetException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { ThemeUtil } from "../util/ThemeUtil";

export class CalenderSheetSchema implements ISchema {
    // static variable
    public static readonly SHEET_NAME: string = Sheets.CALENDER.NAME;
    public static readonly SHEET_INDEX: number = Sheets.CALENDER.INDEX;

    public static readonly COL_DO: string = Sheets.CALENDER.COLUMN.DO;
    public static readonly COL_CALENDER: string = Sheets.CALENDER.COLUMN.CALENDER;
    public static readonly COL_TITLE: string = Sheets.CALENDER.COLUMN.TITLE;
    public static readonly COL_DESCRIPTION: string = Sheets.CALENDER.COLUMN.DESCRIPTION;
    public static readonly COL_ALL_DAY: string = Sheets.CALENDER.COLUMN.ALLDAY;
    public static readonly COL_START_TIME: string = Sheets.CALENDER.COLUMN.START_TIME;
    public static readonly COL_END_TIME: string = Sheets.CALENDER.COLUMN.END_TIME;

    // public local variable
    public readonly doColIndex: number = -1;
    public readonly calenderColIndex: number = -1;
    public readonly titleColIndex: number = -1;
    public readonly descriptionColIndex: number = -1;
    public readonly allDayColIndex: number = -1;
    public readonly startTimeColIndex: number = -1;
    public readonly endTimeColIndex: number = -1;

    // public abstract variable
    public ISHEET: ISheet = Sheets.CALENDER;
    public NUM_OF_ROWS: number = 1;
    public NUM_OF_COLUMNS: number = 1;

    public HEADDER_ROW_FONT_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableHeadderFontColor;
    public HEADDER_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableHeadderColor;
    public FIRST_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableFirstRowColor;
    public SECOND_ROW_COLOR: string = ThemeUtil.getCurrentTheme().calenderTableSecondRowColor;

    public FREEZE_ROW: number = Sheets.CALENDER.FREEZE.ROW;
    public FREEZE_COLUMN: number = Sheets.CALENDER.FREEZE.COLUMN;

    // private local variable
    private isThisSchemaValid: boolean = false;
    private currentSheet: GoogleAppsScript.Spreadsheet.Sheet;

    //constructor
    private constructor (sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        this.currentSheet = Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET_NAME);
        this.NUM_OF_COLUMNS = sheet.getMaxColumns();
        let firstRowRangeValues = sheet.getSheetValues(1, 1, 1, this.NUM_OF_COLUMNS);
        for (let i = 0; i < this.NUM_OF_COLUMNS; i++) {
            switch (firstRowRangeValues[0][i]) {
                case CalenderSheetSchema.COL_DO: this.doColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_CALENDER: this.calenderColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_TITLE: this.titleColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_DESCRIPTION: this.descriptionColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_ALL_DAY: this.allDayColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_START_TIME: this.startTimeColIndex = i + 1;
                    break;
                case CalenderSheetSchema.COL_END_TIME: this.endTimeColIndex = i + 1;
                    break;
                default:
                    break;
            }
        }
        this.NUM_OF_ROWS = sheet.getMaxRows();
    }

    // static method
    public static getValidSchema(sheet: GoogleAppsScript.Spreadsheet.Sheet): CalenderSheetSchema {
        Preconditions.checkNotNull(sheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET_NAME);
        Preconditions.checkArgument(sheet.getName() === CalenderSheetSchema.SHEET_NAME,
            Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET_NAME);

        let newSchema = new CalenderSheetSchema(sheet);
        if (newSchema.isSchemaValid()) {
            return newSchema;
        }
        throw new InvalidSheetException(Utilities.formatString(Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET_NAME));
    }

    public static getValidCalenderSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): CalenderSheetSchema {
        Preconditions.checkNotNull(spreadsheet, Msg.SHEET.NOT_FOUND, CalenderSheetSchema.SHEET_NAME);
        return CalenderSheetSchema.getValidSchema(spreadsheet.getSheetByName(CalenderSheetSchema.SHEET_NAME));
    }

    // public abstract methods 
    public getSheetName(): string {
        return CalenderSheetSchema.SHEET_NAME;
    }

    public getMinColWidth(index: number): number {
        switch (index) {
            case this.doColIndex: return Sheets.CALENDER.MIN_WIDTH.DO;
            case this.calenderColIndex: return Sheets.CALENDER.MIN_WIDTH.CALENDER;
            case this.titleColIndex: return Sheets.CALENDER.MIN_WIDTH.TITLE;
            case this.descriptionColIndex: return Sheets.CALENDER.MIN_WIDTH.DESCRIPTION;
            case this.allDayColIndex: return Sheets.CALENDER.MIN_WIDTH.ALLDAY;
            case this.startTimeColIndex: return Sheets.CALENDER.MIN_WIDTH.START_TIME;
            case this.endTimeColIndex: return Sheets.CALENDER.MIN_WIDTH.END_TIME;
            default: return null;
        }
    }

    public getMaxColWidth(index: number): number {
        switch (index) {
            case this.doColIndex: return Sheets.CALENDER.MAX_WIDTH.DO;
            case this.calenderColIndex: return Sheets.CALENDER.MAX_WIDTH.CALENDER;
            case this.titleColIndex: return Sheets.CALENDER.MAX_WIDTH.TITLE;
            case this.descriptionColIndex: return Sheets.CALENDER.MAX_WIDTH.DESCRIPTION;
            case this.allDayColIndex: return Sheets.CALENDER.MAX_WIDTH.ALLDAY;
            case this.startTimeColIndex: return Sheets.CALENDER.MAX_WIDTH.START_TIME;
            case this.endTimeColIndex: return Sheets.CALENDER.MAX_WIDTH.END_TIME;
            default: return null;
        }
    }

    public getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        Preconditions.checkArgument(this.isThisSchemaValid, Msg.SHEET.INVALID_SHEET, CalenderSheetSchema.SHEET_NAME);
        return this.currentSheet;
    }

    public insertRows(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.currentSheet.insertRows(this.NUM_OF_ROWS, howMany);
        this.NUM_OF_ROWS += howMany;
    }

    public insertsColumns(howMany: number): void {
        if (howMany < 1) {
            return;
        }
        this.currentSheet.insertColumns(this.NUM_OF_COLUMNS, howMany);
        this.NUM_OF_COLUMNS += howMany;
    }

    public removeRow(index: number, howmany?: number): void {
        if (index < 1) {
            return;
        }
        if (Predicates.IS_NULL.test(howmany)) {
            this.currentSheet.deleteRow(index);
            this.NUM_OF_ROWS--;
        } else if (Predicates.IS_POSITIVE.test(howmany)) {
            this.currentSheet.deleteRows(index, howmany);
            this.NUM_OF_ROWS -= howmany;
        }
    }

    // public local methods

    // private local method
    private isSchemaValid(): boolean {
        if (Predicates.IS_NOT_POSITIVE.test(this.doColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.calenderColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.titleColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.descriptionColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.allDayColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.startTimeColIndex)) return false;
        if (Predicates.IS_NOT_POSITIVE.test(this.endTimeColIndex)) return false;
        this.isThisSchemaValid = true;
        return true;
    }
}