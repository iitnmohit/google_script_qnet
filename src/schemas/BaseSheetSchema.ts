import { ThemeUtil } from "../util/ThemeUtil";
import { CitySheetSchema } from "./CitySheetSchema";
import { ISchema } from "../interface/ISchema";
import { LovSheetSchema } from "./LovSheetSchema";
import { NameListSheetSchema } from "./NameListSheetSchema";
import { OverViewSheetSchema } from "./OverViewSheetSchema";

export abstract class BaseSheetSchema implements ISchema {
    public static readonly MSG_ERROR_SHEET_EQ_NULL: string = " sheet not found.";
    public static readonly MSG_INVALID_SHEET_NAME: string = " sheet name is not valid.";
    public static readonly MSG_ERROR_INVALID_SHEET: string = " sheet is not valid.";

    public static readonly MINIUM_ROW_HEIGHT: number = 5;

    public static getSchema(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, sheetName: string)
        : CitySheetSchema | LovSheetSchema | NameListSheetSchema | OverViewSheetSchema {
        if (spreadsheet == null) {
            throw new Error();
        }
        switch (sheetName) {
            case CitySheetSchema.SHEET_NAME: {
                let citySheet = spreadsheet.getSheetByName(sheetName);
                if (citySheet == null) {
                    throw new Error();
                } else {
                    return CitySheetSchema.getValidSchema(citySheet);
                }
            }
            case LovSheetSchema.SHEET_NAME: {
                let lovSheet = spreadsheet.getSheetByName(sheetName);
                if (lovSheet == null) {
                    throw new Error();
                } else {
                    return LovSheetSchema.getValidSchema(lovSheet);
                }
            }
            case NameListSheetSchema.SHEET_NAME: {
                let nameSheet = spreadsheet.getSheetByName(sheetName);
                if (nameSheet == null) {
                    throw new Error();
                } else {
                    return NameListSheetSchema.getValidSchema(nameSheet);
                }
            }
            case OverViewSheetSchema.SHEET_NAME: {
                let overviewSheet = spreadsheet.getSheetByName(sheetName);
                if (overviewSheet == null) {
                    throw new Error();
                } else {
                    return OverViewSheetSchema.getValidSchema(overviewSheet);
                }
            }
            default: throw new Error();
        }
    }

    //implement from interface

    public ROW_HEIGHT: number = ThemeUtil.getCurrentTheme().rowHeight;
    public FREEZE_ROW: number = 1;
    public FREEZE_COLUMN: number = 0;

    public abstract DEFAULT_ROW_COUNT: number;
    public abstract DEFAULT_COL_COUNT: number;

    public abstract HEADDER_ROW_FONT_COLOR: string;
    public abstract HEADDER_ROW_COLOR: string;
    public abstract FIRST_ROW_COLOR: string;
    public abstract SECOND_ROW_COLOR: string;

    public abstract getSheetName(): string;

    public abstract getHeadderValues(): Array<string>;

    public abstract getMinColWidth(index: number): number;

    public abstract getMaxColWidth(index: number): number | null;

    public abstract getCurrentSheet(): GoogleAppsScript.Spreadsheet.Sheet;
}