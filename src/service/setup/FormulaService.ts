import { Sheets } from "../../constants/Sheets";
import { CitySheetSchema } from "../../schemas/CitySheetSchema";
import { NameListSheetSchema } from "../../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../../schemas/OverViewSheetSchema";
import { FormulaBuilder } from "../../util/FormulaBuilder";
import { Util } from "../../util/Util";

/**
 * Scope of this class is to add formulas in the sheet during setup.
 */
export class FormulaService {
    private static citySchema: CitySheetSchema;
    private static nameSchema: NameListSheetSchema;
    private static overviewSchema: OverViewSheetSchema;

    /**
     * Applies formulas to all sheet.
     * @param spreadsheet current spreadsheet
     */
    public static applyFormulaToAllSheets(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void;
    public static applyFormulaToAllSheets(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        FormulaService.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        FormulaService.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
        FormulaService.overviewSchema = OverViewSheetSchema.getValidOverViewSchema(spreadsheet);

        FormulaService.applyFormulaToCitySheets();
        FormulaService.applyFormulaToOverviewSheets();
    }

    /**
     * Applies formula to city sheet.
     */
    private static applyFormulaToCitySheets(): void {
        let rangeLocationA1Notation = this.nameSchema.getColumnA1NotationByName(Sheets.COLUMN_NAME.LOCATION);
        let cityCellA1Notation = this.citySchema.getCellA1Notation(2, Sheets.COLUMN_NAME.LOCATION);

        let formula = FormulaBuilder.newBuilder()
            .COUNTIF(rangeLocationA1Notation, cityCellA1Notation)
            .showIfNonZero()
            .build();

        this.citySchema.setFormulaToColumn(Sheets.COLUMN_NAME.COUNT, formula);
    }

    /**
     * Applies formula to overview sheet.
     */
    private static applyFormulaToOverviewSheets(): void {
        FormulaService.setFormulaToOverallTable();
        FormulaService.setFormulaToListWiseTable();
    }

    /**
     * applies formula to List Wise Table.
     */
    private static setFormulaToListWiseTable(): void {
        let schema = this.overviewSchema;
        let table = this.overviewSchema.ISHEET.TABLES.TABLE_LIST_WISE;

        let tableListwiseValues = schema.getTableValues(table);
        let formulaValues = new Array<Array<string>>();
        let topHeadderRowArray = tableListwiseValues[0];

        for (let row = 1; row < tableListwiseValues.length; row++) {
            let eachRowArray = tableListwiseValues[row];
            let eachFormulaRow = new Array<string>();

            for (let col = 1; col < eachRowArray.length; col++) {
                let range1 = this.nameSchema.getColumnA1NotationByName(Sheets.COLUMN_NAME.LIST);

                let tableStartColumLetter = Util.getColumnLetter(table.INDEX.col);
                let rowNumInSheet = table.INDEX.row + row;
                let condition1 = tableStartColumLetter + rowNumInSheet;
                if (col == 1) {
                    let formula = FormulaBuilder.newBuilder()
                        .COUNTIF(range1, condition1)
                        .build();
                    eachFormulaRow.push(formula);
                } else {
                    let range2 = this.nameSchema.getColumnA1NotationByName(topHeadderRowArray[col]);
                    let condition2 = "\"<>\"";
                    let formula = FormulaBuilder.newBuilder()
                        .COUNTIF2(range1, condition1, range2, condition2)
                        .build();
                    eachFormulaRow.push(formula);
                }
            }
            formulaValues.push(eachFormulaRow);
        }
        schema.setFormulasToTable(table, formulaValues);
    }

    /**
     * Applies formula to OVERALL TABLE.
     */
    private static setFormulaToOverallTable(): void {
        let schema = this.overviewSchema;
        let table = this.overviewSchema.ISHEET.TABLES.TABLE_OVERALL;

        let tableOverAllValues = schema.getTableValues(table);
        let formulaValues = new Array<Array<string>>();

        for (let row = 0; row < tableOverAllValues.length; row++) {
            let leftHeadderValue = tableOverAllValues[row][0];
            let values = this.nameSchema.getColumnA1NotationByName(leftHeadderValue);
            let formula = FormulaBuilder.newBuilder()
                .COUNTA(values)
                .subtract(1)
                .build();
            formulaValues.push([formula]);
        }
        schema.setFormulasToTable(table, formulaValues);
    }
}