import { CallLogService } from "./CallLogService";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { Util } from "./Util";
// to do
export class DocService {
    private static readonly docId: string = "19OQQFLwN4eYqsPr59bu0hx6n4MV82STntQHfbufhcWE";

    public updateAllLogs(): void {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = NameListSheetSchema.getValidSchema(sheet);

        if (nameListSchema.nameColIndex < 1 || nameListSchema.slNoColIndex < 1) {
            return;
        }

        let logDocument = DocumentApp.openById(DocService.docId);
        if (logDocument == null) {
            return;
        }
        let docBody = logDocument.getBody();
        
        //clear the content
        docBody.clear();

        let textEdit = docBody.editAsText();

        let slNoColRange = sheet.getRange(2, nameListSchema.slNoColIndex, sheet.getLastRow() - 1, 1);
        let nameColRange = sheet.getRange(2, nameListSchema.nameColIndex, sheet.getLastRow() - 1, 1);

        let slNoColRangeValues = slNoColRange.getValues();
        let nameColRangeValues = nameColRange.getValues();
        let callLogsValues = nameColRange.getNotes();

        let numOfRows = slNoColRange.getHeight();
        for (let row = 0; row < numOfRows; row++) {

            let nameValue = this.extractValidValueFromArray(nameColRangeValues, row, 0);
            if (nameValue.length == 0) {
                break;
            }

            let slValue = this.extractValidValueFromArray(slNoColRangeValues, row, 0);
            let noteValue = this.extractValidValueFromArray(callLogsValues, row, 0);

            let logTitle = nameValue;
            if (slValue.length > 0) {
                logTitle = logTitle + " (" + slValue + ")";
            }
            noteValue = Util.formatUpdateLog(noteValue)
        }

    }
    private extractValidValueFromArray(array: any[][], row: number, col: number): string {
        if (array == null || row == null || col == null) {
            return "";
        }
        if (row < 0 || col < 0) {
            return "";
        }
        if (array.length < (row + 1)) {
            return "";
        }
        let innerArray = array[row];
        if (innerArray.length < (col + 1)) {
            return "";
        }
        let arrayValue = innerArray[col];
        if (arrayValue == null) {
            return "";
        }
        if (typeof arrayValue !== "string") {
            return "";
        }
        return arrayValue.trim();
    }

}