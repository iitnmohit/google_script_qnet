import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";

export class SetUpValidationService {
    private readonly spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private readonly citySchema: CitySheetSchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;
    private readonly overviewSchema: OverViewSheetSchema;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.spreadSheet = spreadsheet;
        this.citySchema = BaseSheetSchema.getSchema(spreadsheet, CitySheetSchema.SHEET_NAME) as CitySheetSchema;
        this.lovSchema = BaseSheetSchema.getSchema(spreadsheet, LovSheetSchema.SHEET_NAME) as LovSheetSchema;
        this.nameSchema = BaseSheetSchema.getSchema(spreadsheet, NameListSheetSchema.SHEET_NAME) as NameListSheetSchema;
        this.overviewSchema = BaseSheetSchema.getSchema(spreadsheet, OverViewSheetSchema.SHEET_NAME) as OverViewSheetSchema;
    }

    public applyValidationToAllSheets(): void {
        this.applyValidationToCitySheets()
            .applyValidationToLovSheets()
            .applyValidationToNameSheets()
            .applyValidationToOverviewSheets();
    }

    private applyValidationToCitySheets(): SetUpValidationService {
        let sheet = this.citySchema.getCurrentSheet();
        let countColRange = sheet.getRange(2, this.citySchema.countColIndex, sheet.getMaxRows() - 1, 1);
        countColRange.setFormula("=IF(COUNTIF('NAME LIST'!G:G,A2) = 0,,COUNTIF('NAME LIST'!G:G,A2))");


        return this;
    }

    private applyValidationToOverviewSheets(): SetUpValidationService {
        return this;
    }

    private applyValidationToNameSheets(): SetUpValidationService {
        return this;
    }

    private applyValidationToLovSheets(): SetUpValidationService {
        return this;
    }


}