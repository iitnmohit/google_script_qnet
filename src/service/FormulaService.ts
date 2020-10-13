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
        let countColRange = citySheet.getRange(2, this.citySchema.countColIndex, this.citySchema.NUM_OF_ROWS - 1, 1);
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
        let overViewSheet = this.overviewSchema.getCurrentSheet();
        this.setFormulaToOverallTable(overViewSheet);
        this.setFormulaToListWiseTable(overViewSheet);
        return this;
    }

    private setFormulaToListWiseTable(overViewSheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        let tableListwiseValues = overViewSheet.getSheetValues(this.overviewSchema.tableListWiseRowIndex,
            this.overviewSchema.tableListWiseColIndex, this.overviewSchema.ISHEET.TABLES.TABLE_LIST_WISE.HEIGHT,
            this.overviewSchema.ISHEET.TABLES.TABLE_LIST_WISE.WIDTH);
        let formulaTable = new Array<string[]>();
        let topHeadderArray = tableListwiseValues[0];
        for (let row = 1; row < tableListwiseValues.length; row++) {
            let rowArray = tableListwiseValues[row];
            let formulaRow = new Array<string>();
            for (let col = 1; col < rowArray.length; col++) {
                if (col == 1) {
                    formulaRow.push(`=COUNTIF(${Util.getColumnA1Notation(this.nameSchema.listColIndex, 1, this.nameSchema.getSheetName())},${Util.getColumnLetter(this.overviewSchema.tableListWiseColIndex)}${this.overviewSchema.tableListWiseRowIndex + row})`);
                } else {
                    formulaRow.push(`=COUNTIFS(${Util.getColumnA1Notation(this.nameSchema.listColIndex, 1, this.nameSchema.getSheetName())},${Util.getColumnLetter(this.overviewSchema.tableListWiseColIndex)}${this.overviewSchema.tableListWiseRowIndex + row},${Util.getColumnA1Notation(this.nameSchema.getColIndexByName(topHeadderArray[col]), 1, this.nameSchema.getSheetName())},"<>")`);
                }
            }
            formulaTable.push(formulaRow);
        }
        overViewSheet.getRange(this.overviewSchema.tableListWiseRowIndex + 1,
            this.overviewSchema.tableListWiseColIndex + 1,
            this.overviewSchema.ISHEET.TABLES.TABLE_LIST_WISE.HEIGHT - 1,
            this.overviewSchema.ISHEET.TABLES.TABLE_LIST_WISE.WIDTH - 1)
            .setFormulas(formulaTable);
    }

    private setFormulaToOverallTable(overViewSheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        let tableOverAllLeftHeaderValue = overViewSheet.getSheetValues(this.overviewSchema.tableOverallRowIndex,
            this.overviewSchema.tableOverallColIndex, this.overviewSchema.ISHEET.TABLES.TABLE_OVERALL.HEIGHT, 1);
        let formulaArray = new Array<string[]>();
        for (let key of tableOverAllLeftHeaderValue) {
            formulaArray.push([`=COUNTA(${Util.getColumnA1Notation(
                this.nameSchema.getColIndexByName(key[0]), 2, this.nameSchema.getSheetName())})`]);
        }
        overViewSheet.getRange(this.overviewSchema.tableOverallRowIndex,
            this.overviewSchema.tableOverallColIndex + 1, this.overviewSchema.ISHEET.TABLES.TABLE_OVERALL.HEIGHT, 1)
            .setFormulas(formulaArray);
    }
}