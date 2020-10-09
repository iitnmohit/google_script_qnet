import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { FormulaBuilder } from "../util/FormulaBuilder";
import { Util } from "../util/Util";

export class FormulaService {
    private readonly spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private readonly citySchema: CitySheetSchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;
    private readonly overviewSchema: OverViewSheetSchema;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.spreadSheet = spreadsheet;
        this.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        this.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        this.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema(spreadsheet);
    }

    public applyFormulaToAllSheets(): void {
        this.applyFormulaToCitySheets()
            .applyFormulaToLovSheets()
            .applyFormulaToNameSheets()
            .applyFormulaToOverviewSheets();
    }

    private applyFormulaToCitySheets(): FormulaService {
        let citySheet = this.citySchema.getCurrentSheet();
        let countColRange = citySheet.getRange(2, this.citySchema.countColIndex, citySheet.getMaxRows() - 1, 1);
        let formula = FormulaBuilder.newBuilder()
            .COUNTIF(
                Util.getColumnA1Notation(this.nameSchema.locationColIndex, 1, this.nameSchema.getSheetName())
                , Util.getRangeA1Notation(citySheet.getRange(2, this.citySchema.locationColIndex)))
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