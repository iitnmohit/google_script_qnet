import { CitySheetSchema } from "../schemas/CitySheetSchema";
import { LovSheetSchema } from "../schemas/LovSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { OverViewSheetSchema } from "../schemas/OverViewSheetSchema";

export class SecurityService {
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

    public protectSpreadSheet(): void {
        this.protectOverViewSheet()
            .protectNameSheet()
            .protectListSheet()
            .protectCitySheet();

    }

    private protectOverViewSheet(): SecurityService {
        return this.setEditWarningToSheet(this.overviewSchema.getCurrentSheet());
    }

    private protectNameSheet(): SecurityService {
        return this;
    }

    private protectListSheet(): SecurityService {
        return this.setEditWarningToSheet(this.lovSchema.getCurrentSheet());
    }

    private protectCitySheet(): SecurityService {
        return this.setEditWarningToSheet(this.citySchema.getCurrentSheet());
    }

    private setEditWarningToSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): SecurityService {
        sheet.protect()
            .setDescription("Do, if you know what are you doing.")
            .setWarningOnly(true);
        return this;
    }
}