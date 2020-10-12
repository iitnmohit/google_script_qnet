import { ISchema } from "../interface/ISchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";

export class ValidationService {
    private readonly citySchema: CitySheetSchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;
    private readonly overviewSchema: OverViewSheetSchema;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        this.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        this.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema(spreadsheet);
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
        return this.applyToNamelistSheetCol(this.lovSchema, this.lovSchema.listColIndex
            , NameListSheetSchema.COL_LIST, this.nameSchema.listColIndex)
            .applyToNamelistSheetCol(this.citySchema, this.citySchema.locationColIndex,
                NameListSheetSchema.COL_LOCATION, this.nameSchema.locationColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.zoneColIndex
                , NameListSheetSchema.COL_ZONE, this.nameSchema.zoneColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.connectUpColIndex
                , NameListSheetSchema.COL_CONNECT_UP, this.nameSchema.connectUpColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.infoColIndex
                , NameListSheetSchema.COL_INFO, this.nameSchema.infoColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.edifyColIndex
                , NameListSheetSchema.COL_EDIFY, this.nameSchema.edifyColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.inviteColIndex
                , NameListSheetSchema.COL_INVITE, this.nameSchema.inviteColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.planColIndex
                , NameListSheetSchema.COL_PLAN, this.nameSchema.planColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.closingColIndex
                , NameListSheetSchema.COL_CLOSING, this.nameSchema.closingColIndex)
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.castColIndex
                , NameListSheetSchema.COL_CAST, this.nameSchema.castColIndex);
    }

    private applyToNamelistSheetCol(schema: ISchema,
        lovColIndex: number,
        targetColName: string,
        targetColIndex: number
    ): ValidationService {
        let lovSheet = schema.getCurrentSheet();
        let nameListSheet = this.nameSchema.getCurrentSheet();
        let cellRange = nameListSheet.getRange(2, targetColIndex, this.nameSchema.NUM_OF_ROWS - 1, 1);
        let dataValidation = SpreadsheetApp.newDataValidation()
            .requireValueInRange(lovSheet.getRange(2, lovColIndex, schema.NUM_OF_ROWS - 1, 1), true)
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