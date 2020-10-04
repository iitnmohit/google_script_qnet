import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { FormulaBuilder } from "../util/FormulaBuilder";

export class FormulaService {
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

    public applyFormulaToAllSheets(): void {
        this.applyFormulaToCitySheets()
            .applyFormulaToLovSheets()
            .applyFormulaToNameSheets()
            .applyFormulaToOverviewSheets();
    }

    private applyFormulaToCitySheets(): FormulaService {
        let sheet = this.citySchema.getCurrentSheet();
        let countColRange = sheet.getRange(2, this.citySchema.countColIndex, sheet.getMaxRows() - 1, 1);
        let formula = FormulaBuilder.newBuilder()
            .COUNTIF(this.nameSchema.getColumnA1Notation(this.nameSchema.locationColIndex, 0, true)
                , this.citySchema.getCellA1Notation(2, this.citySchema.locationColIndex))
            .showIfNonZero()
            .build();
        countColRange.setFormula(formula);
        return this;
    }

    private applyFormulaToLovSheets(): FormulaService {
        return this;
    }

    private applyFormulaToNameSheets(): FormulaService {
        return this;
    }

    private applyFormulaToOverviewSheets(): FormulaService {
        return this;
    }
}