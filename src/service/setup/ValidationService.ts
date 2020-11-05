import { Msg } from "../../constants/Message";
import { Sheets } from "../../constants/Sheets";
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

    /**
     * Applies validation to all sheet.
     */
    public static applyValidationToAllSheets(): void {
        ValidationService.citySchema = CitySheetSchema.getValidCitySchema();
        ValidationService.lovSchema = LovSheetSchema.getValidLovSchema();
        ValidationService.nameSchema = NameListSheetSchema.getValidNameListSchema();

        ValidationService.applyValidationToNameSheets();
    }

    /**
     * Apply Data Validation in NameList Sheet.
     */
    private static applyValidationToNameSheets(): void;
    private static applyValidationToNameSheets(): void {
        let colName = Sheets.COLUMN_NAME;
        ValidationService.createDropDown(this.nameSchema, colName.LIST,
            this.lovSchema, colName.LIST);
        ValidationService.createDropDown(this.nameSchema, colName.LOCATION,
            this.citySchema, colName.LOCATION);
        ValidationService.createDropDown(this.nameSchema, colName.ZONE,
            this.lovSchema, colName.ZONE);
        ValidationService.createDropDown(this.nameSchema, colName.CONNECT_UP,
            this.lovSchema, colName.CONNECT_UP);
        ValidationService.createDropDown(this.nameSchema, colName.INFO,
            this.lovSchema, colName.INFO);
        ValidationService.createDropDown(this.nameSchema, colName.EDIFY,
            this.lovSchema, colName.EDIFY);
        ValidationService.createDropDown(this.nameSchema, colName.INVITE,
            this.lovSchema, colName.INVITE);
        ValidationService.createDropDown(this.nameSchema, colName.PLAN,
            this.lovSchema, colName.PLAN);
        ValidationService.createDropDown(this.nameSchema, colName.CLOSING,
            this.lovSchema, colName.CLOSING);
        ValidationService.createDropDown(this.nameSchema, colName.CAST,
            this.lovSchema, colName.CAST);
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