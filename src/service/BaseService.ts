import { ISchema } from "../interface/ISchema";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CalenderSheetSchema } from "../schemas/CalenderSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";

export class BaseService {
    protected operateOnSelectedRows(
        count: number,
        schema: NameListSheetSchema | CalenderSheetSchema,
        cb: (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
            schema: NameListSheetSchema | CalenderSheetSchema,
            row: number) => void,
        deleteRows: boolean = false
    ): void {
        Preconditions.checkPositive(count);
        let sheet = schema.getCurrentSheet();
        let numOfTimesOperated = 0;
        let rowArray = new Array<number>();
        let doColValues = sheet.getSheetValues(2, schema.doColIndex, schema.NUM_OF_ROWS - 1, 1);
        for (let i = 0; i < doColValues.length; i++) {
            if (Predicates.IS_TRUE.negate().test(doColValues[i][0])) {
                continue;
            }
            let row = i + 2;
            let checkBoxCell = sheet.getRange(row, schema.doColIndex);
            // do operation
            cb(checkBoxCell, schema, row);

            rowArray.push(row);
            //at last uncheck
            checkBoxCell.uncheck();
            numOfTimesOperated++;
            if (count == numOfTimesOperated) {
                break;
            }
        }

        if (deleteRows) {
            let numofRows = rowArray.length;
            this.deleteRows(rowArray, schema);
            schema.insertRows(numofRows);
        }
    }

    private deleteRows(rowArray: Array<number>, schema: ISchema): void {
        while (true) {
            let _r_index = rowArray.pop();
            if (Predicates.IS_NULL.test(_r_index)) {
                break;
            }
            schema.removeRow(_r_index);
        }
    }
}