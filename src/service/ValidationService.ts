import { ISchema } from "../interface/ISchema";
import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";

export class ValidationService {
    private readonly citySchema: CitySheetSchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly nameSchema: NameListSheetSchema;

    constructor (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        this.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        this.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);
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
        return this.applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_LIST)
            , NameListSheetSchema.COL_LIST, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_LIST))
            .applyToNamelistSheetCol(this.citySchema, this.citySchema.getColIndexByName(CitySheetSchema.COL_LOCATION),
                NameListSheetSchema.COL_LOCATION, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_LOCATION))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_ZONE)
                , NameListSheetSchema.COL_ZONE, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_ZONE))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_CONNECT_UP)
                , NameListSheetSchema.COL_CONNECT_UP, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_CONNECT_UP))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_INFO)
                , NameListSheetSchema.COL_INFO, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_INFO))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_EDIFY)
                , NameListSheetSchema.COL_EDIFY, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_EDIFY))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_INVITE)
                , NameListSheetSchema.COL_INVITE, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_INVITE))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_PLAN)
                , NameListSheetSchema.COL_PLAN, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_PLAN))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_CLOSING)
                , NameListSheetSchema.COL_CLOSING, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_CLOSING))
            .applyToNamelistSheetCol(this.lovSchema, this.lovSchema.getColIndexByName(LovSheetSchema.COL_CAST)
                , NameListSheetSchema.COL_CAST, this.nameSchema.getColIndexByName(NameListSheetSchema.COL_CAST));
    }

    private applyToNamelistSheetCol(schema: ISchema,
        lovColIndex: number,
        targetColName: string,
        targetColIndex: number
    ): ValidationService {
        let lovSheet = schema.SPREADSHEET;
        let nameListSheet = this.nameSchema.SPREADSHEET;
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