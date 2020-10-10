import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";

export class BaseService {
    protected operateOnSelectedRows(
        count: number,
        schema: NameListSheetSchema,
        cb: (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
            schema: NameListSheetSchema,
            row: number) => void
    ): void {
        Preconditions.checkPositive(count);
        let sheet = schema.getCurrentSheet();
        let numOfTimesOperated = 0;
        let doColValues = sheet.getRange(2, schema.doColIndex, schema.NUM_OF_ROWS - 1, 1).getValues();
        for (let i = 0; i < doColValues.length; i++) {
            if (Predicates.IS_TRUE.negate().test(doColValues[i][0])) {
                continue;
            }
            let row = i + 2;
            let checkBoxCell = sheet.getRange(row, schema.doColIndex);
            // do operation
            cb(checkBoxCell, schema, row);

            //at last uncheck
            checkBoxCell.uncheck();
            numOfTimesOperated++;
            if (count == numOfTimesOperated) {
                break;
            }
        }
    }
}