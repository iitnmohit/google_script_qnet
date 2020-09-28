import { NameListSheetSchema } from "./NameListSheetSchema";

export class TaskService {

    public clearAllCheckbox(): void {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = new NameListSheetSchema(sheet);

        if (nameListSchema.taskColIndex < 1) {
            return;
        }
        sheet.getRange(2, nameListSchema.taskColIndex, sheet.getMaxRows() - 1, 1).uncheck()
    }

}