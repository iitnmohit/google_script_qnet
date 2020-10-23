import { Msg } from "../../constants/Message";
import { ISchema } from "../../interface/ISchema";
import { Preconditions } from "../../library/Preconditions";
import { CitySheetSchema } from "../../schemas/CitySheetSchema";
import { LovSheetSchema } from "../../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../../schemas/NameListSheetSchema";

/**
 * Scope of this class is to add validation in the sheet during setup.
 */
export class ValidationService {
    private static citySchema: CitySheetSchema;
    private static lovSchema: LovSheetSchema;
    private static nameSchema: NameListSheetSchema;

    public static applyValidationToAllSheets(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void;
    public static applyValidationToAllSheets(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
        ValidationService.citySchema = CitySheetSchema.getValidCitySchema(spreadsheet);
        ValidationService.lovSchema = LovSheetSchema.getValidLovSchema(spreadsheet);
        ValidationService.nameSchema = NameListSheetSchema.getValidNameListSchema(spreadsheet);

        ValidationService.applyValidationToNameSheets();
    }

    /**
     * Apply Data Validation in NameList Sheet.
     */
    private static applyValidationToNameSheets(): void;
    private static applyValidationToNameSheets(): void {
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_LIST,
            this.lovSchema, LovSheetSchema.COL_LIST);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_LOCATION,
            this.citySchema, CitySheetSchema.COL_LOCATION);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_ZONE,
            this.lovSchema, LovSheetSchema.COL_ZONE);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_CONNECT_UP,
            this.lovSchema, LovSheetSchema.COL_CONNECT_UP);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_INFO,
            this.lovSchema, LovSheetSchema.COL_INFO);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_EDIFY,
            this.lovSchema, LovSheetSchema.COL_EDIFY);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_INVITE,
            this.lovSchema, LovSheetSchema.COL_INVITE);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_PLAN,
            this.lovSchema, LovSheetSchema.COL_PLAN);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_CLOSING,
            this.lovSchema, LovSheetSchema.COL_CLOSING);
        ValidationService.createDropDown(this.nameSchema, NameListSheetSchema.COL_CAST,
            this.lovSchema, LovSheetSchema.COL_CAST);
    }

    /**
     * Creates drop down via data validation.
     * @param inSchema [required] at which schema validation has to be applied.
     * @param atColName [required] at which column in schema, validation has to be applied.
     * @param lovSchema [required] from which schema list value is read.
     * @param lovColName [required] from which column list value is read in schema.
     * @throws NullPointerException if any of the input is not valid.
     */
    private static createDropDown(inSchema: ISchema, atColName: string,
        lovSchema: ISchema, lovColName: string): void;
    private static createDropDown(inSchema: ISchema, atColName: string,
        lovSchema: ISchema, lovColName: string): void {
        Preconditions.checkNotNull(inSchema);
        Preconditions.checkNotNull(atColName);
        Preconditions.checkNotNull(lovSchema);
        Preconditions.checkNotNull(lovColName);

        let validationErrorMsg = Utilities.formatString(Msg.SHEET.VALIDATION_DROP_DOWN__INVALID_INPUT, atColName);
        let dataValidation = SpreadsheetApp.newDataValidation()
            .requireValueInRange(lovSchema.getColumnRangeByName(lovColName), true)
            .setAllowInvalid(false)
            .setHelpText(validationErrorMsg)
            .build();
        let columnRange = inSchema.getColumnRangeByName(atColName);
        columnRange.setDataValidation(dataValidation);
    }
}