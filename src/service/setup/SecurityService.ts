import { CitySheetSchema } from "../../schemas/CitySheetSchema";
import { LovSheetSchema } from "../../schemas/LovSheetSchema";
import { OverViewSheetSchema } from "../../schemas/OverViewSheetSchema";

export class SecurityService {
    private readonly citySchema: CitySheetSchema;
    private readonly lovSchema: LovSheetSchema;
    private readonly overviewSchema: OverViewSheetSchema;

    constructor () {
        this.citySchema = CitySheetSchema.getValidCitySchema();
        this.lovSchema = LovSheetSchema.getValidLovSchema();
        this.overviewSchema = OverViewSheetSchema.getValidOverViewSchema();
    }

    public protectSpreadSheet(): void {
        this.protectOverViewSheet()
            .protectNameSheet()
            .protectListSheet()
            .protectCitySheet();

    }

    private protectOverViewSheet(): SecurityService {
        return this.setEditWarningToSheet(this.overviewSchema.SPREADSHEET);
    }

    private protectNameSheet(): SecurityService {
        return this;
    }

    private protectListSheet(): SecurityService {
        return this.setEditWarningToSheet(this.lovSchema.SPREADSHEET);
    }

    private protectCitySheet(): SecurityService {
        return this.setEditWarningToSheet(this.citySchema.SPREADSHEET);
    }

    private setEditWarningToSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): SecurityService {
        sheet.protect()
            .setDescription("Do, if you know what are you doing.")
            .setWarningOnly(true);
        return this;
    }
}