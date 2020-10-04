import { BaseSheetSchema } from "../schemas/BaseSheetSchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";
import { FormulaBuilder } from "../util/FormulaBuilder";

export class ValidationService {
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

    private applyValidationToCitySheets(): ValidationService {
        return this;
    }

    private applyValidationToLovSheets(): ValidationService {
        return this;
    }

    private applyValidationToNameSheets(): ValidationService {
        let lovSheet = this.lovSchema.getCurrentSheet();
        let citySheet = this.citySchema.getCurrentSheet();

        return this.applyToNamelistSheetCol(lovSheet, this.lovSchema.listColIndex
            , NameListSheetSchema.COL_LIST, this.nameSchema.listColIndex)
            .applyToNamelistSheetCol(citySheet, this.citySchema.locationColIndex,
                NameListSheetSchema.COL_LOCATION, this.nameSchema.locationColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.zoneColIndex
                , NameListSheetSchema.COL_ZONE, this.nameSchema.zoneColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.connectUpColIndex
                , NameListSheetSchema.COL_CONNECT_UP, this.nameSchema.connectUpColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.infoColIndex
                , NameListSheetSchema.COL_INFO, this.nameSchema.infoColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.edifyColIndex
                , NameListSheetSchema.COL_EDIFY, this.nameSchema.edifyColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.inviteColIndex
                , NameListSheetSchema.COL_INVITE, this.nameSchema.inviteColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.planColIndex
                , NameListSheetSchema.COL_PLAN, this.nameSchema.planColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.closingColIndex
                , NameListSheetSchema.COL_CLOSING, this.nameSchema.closingColIndex)
            .applyToNamelistSheetCol(lovSheet, this.lovSchema.castColIndex
                , NameListSheetSchema.COL_CAST, this.nameSchema.castColIndex);
    }

    private applyToNamelistSheetCol(lovSheet: GoogleAppsScript.Spreadsheet.Sheet,
        lovColIndex: number,
        targetColName: string,
        targetColIndex: number
    ): ValidationService {
        let nameListSheet = this.nameSchema.getCurrentSheet();
        let cellRange = nameListSheet.getRange(2, targetColIndex, nameListSheet.getMaxRows() - 1, 1);
        let dataValidation = SpreadsheetApp.newDataValidation()
            .requireValueInRange(lovSheet.getRange(2, lovColIndex, lovSheet.getMaxRows() - 1, 1), true)
            .setAllowInvalid(false)
            .setHelpText("Select " + targetColName.toLowerCase() + " value from dropdown.")
            .build();
        cellRange.setDataValidation(dataValidation);
        return this;
    }

    private applyValidationToOverviewSheets(): ValidationService {
        return this;
    }




}