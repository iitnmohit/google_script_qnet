import { Constant } from "../constants/Constant";
import { Msg } from "../constants/Message";
import { ITable } from "../interface/ISheet";
import { Index } from "../library/Index";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { DateUtil } from "./DateUtil";

/**
 * Util class used for data manuplation, no service call or api call.
 */
export class Util {

    /**
     * Converts Array\<T\>, into Array\<Array\<T\>\> 
     * @param array array of type T
     * @return if array is non empty then return array of array of each element T
     * @return if array is null then return null
     * @return if array is empty then return a empty array of array
     */
    public static arrayOfArray<T>(array: Array<T>): Array<Array<T>>;
    public static arrayOfArray<T>(array: Array<T>): Array<Array<T>> {
        // check for null
        if (Predicates.IS_NULL.test(array)) {
            return null;
        }
        // check for empty array
        if (Predicates.IS_LIST_EMPTY.test(array)) {
            return [[]];
        }
        // converts the array
        return array.map((t): Array<T> => {
            return [t];
        });
    }

    /**
     * Format the log text with space and date.
     * 
     * replace special text as per LOG property 
     * @param log input text log 
     * @param todayDate [optional = today date] if provided consider this date as referance date for today.
     * @return formatted log text
     * @return if log is null or blank, return empty text
     */
    public static formatLog(log: string): string;
    public static formatLog(log: string, todayDate: Date): string;
    public static formatLog(log: string, todayDate: Date = DateUtil.localDate()): string {
        if (Predicates.IS_BLANK.test(log)) {
            return "";
        }
        let formatedLogLines: Array<string> = new Array<string>();
        let logLines: Array<string> = log.split("\n");
        for (let eachLine of logLines) {
            eachLine = eachLine.replace("•", "").replace("-", "").trim();
            if (Predicates.IS_BLANK.test(eachLine)) {
                continue;
            }
            if (DateUtil.isValid(eachLine)) {
                formatedLogLines.push("\n");
                formatedLogLines.push(DateUtil.format(eachLine));
                continue;
            }
            if (Constant.LOG_TEXT_TO_REPLACE_FUNCTION_MAP.has(eachLine.toLocaleLowerCase())) {
                formatedLogLines.push("\n");
                formatedLogLines.push(Constant.LOG_TEXT_TO_REPLACE_FUNCTION_MAP
                    .get(eachLine.toLocaleLowerCase())(todayDate));
                continue;
            }
            if (Constant.LOG_TEXT_TO_REPLACE_MAP.has(eachLine.toLocaleLowerCase())) {
                formatedLogLines.push(Constant.LOG_TEXT_TO_REPLACE_MAP.get(eachLine.toLocaleLowerCase()));
                continue;
            }
            formatedLogLines.push(" • " + eachLine);
        }
        return formatedLogLines.join("\n").trim();
    }

    /**
     * Convert entire column into A1 notation.
     * @param colIndex [mandatory] column index starting from 1. 
     * @param beginRow [optional = 1] row index starting from 1
     * @param sheetName [optional = ""] sheet name in text
     * @return column A1 notation e.g. A:A
     * @return if beginRow is positive return including begin row, eg A5:A or A:A if begin row is 1
     * @return if sheetName is not blank retun include sheet name, e.g. 'sheet1'!A4:A
     * @throws IllegalArgumentException, if colIndex is not positive.
     */
    public static getColumnA1Notation(colIndex: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number, sheetName: string): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number = 1, sheetName?: string): string {
        Preconditions.checkPositive(colIndex, Msg.SHEET.COL_INDEX_POSITIVE);

        let colLetter = Util.getColumnLetter(colIndex);
        let beginRowNum = "";
        if (beginRow > 1) {
            beginRowNum += beginRow;
        }
        if (Predicates.IS_BLANK.test(sheetName)) {
            return `${colLetter}${beginRowNum}:${colLetter}`;
        } else {
            return `'${sheetName}'!${colLetter}${beginRowNum}:${colLetter}`;
        }
    }

    /**
     * Converts column index (number) to letter
     * @param index starts from 1
     * @return column Letter e.x. 27 -> AA, 3 -> C
     * @return blank string, if column index is not positive
     */
    public static getColumnLetter(index: number): string;
    public static getColumnLetter(index: number): string {
        switch (index) {
            case 1: return "A";
            case 2: return "B";
            case 3: return "C";
            case 4: return "D";
            case 5: return "E";
            case 6: return "F";
            case 7: return "G";
            case 8: return "H";
            case 9: return "I";
            case 10: return "J";
            case 11: return "K";
            case 12: return "L";
            case 13: return "M";
            case 14: return "N";
            case 15: return "O";
            case 16: return "P";
            case 17: return "Q";
            case 18: return "R";
            case 19: return "S";
            case 20: return "T";
            case 21: return "U";
            case 22: return "V";
            case 23: return "W";
            case 24: return "X";
            case 25: return "Y";
            case 26: return "Z";
        }
        if (Predicates.IS_NOT_POSITIVE.test(index)) {
            return "";
        }
        if (index % 26 == 0) {
            return Util.getColumnLetter((index / 26) - 1) + "Z";
        } else {
            return Util.getColumnLetter(index / 26) + Util.getColumnLetter(index % 26);
        }
    }

    /**
     * Create a two dimensional array of blank string or provided value.
     * @param height positive height of array
     * @param width positive widht of array
     * @param innitialDate [optional = ""] fill with this instead of blank
     * @returns Two Dimensional array with provided size,
     *  If size is not provided properly return zero size array.
     */
    public static innitializeEmptyTableArray(height: number, width: number): string[][];
    public static innitializeEmptyTableArray(height: number, width: number, innitialData: string): string[][];
    public static innitializeEmptyTableArray(height: number, width: number, innitialData?: string): string[][] {
        if (Predicates.IS_NOT_POSITIVE.test(height)) {
            return [[]];
        }
        if (Predicates.IS_NOT_POSITIVE.test(width)) {
            return [[]];
        }
        if (Predicates.IS_NULL.test(innitialData)) {
            innitialData = "";
        }
        let array = [];
        for (let index = 0; index < height; index++) {
            let tempArray = [];
            for (let innerIndex = 0; innerIndex < width; innerIndex++) {
                tempArray.push(innitialData);
            }
            array.push(tempArray);
        }
        return array;
    }

    /**
     * Ensures width, height and value in two dimensional array.
     * @param twoDarray input array to be operate on.
     * @param height ensure height of array, should be greater than 0.
     * @param width ensure width of array, should be greater than 0.
     * @param data [optional = Constant.DEFAULT_DUMMY_DATA] text to be replaced by blank string, 
     * default is "NA" (Constant.DEFAULT_DUMMY_DATA).
     * @param everywhere [optional = false] if true, replace blank with data at everywhere otherwise,
     *  replace only at bottom right index iff either of last row or column is having all the value blank
     * @returns modified array with data manuplated as above
     * @returns if twoDarray is null, creates a new array instaed
     * @throws IllegalArgumentException, if either of height or width is not positive.
     */
    public static ensuresDimensionAndFillDataToArray(twoDarray: any[][], height: number, width: number): any[][];
    public static ensuresDimensionAndFillDataToArray(twoDarray: any[][], height: number, width: number,
        data: any): any[][];
    public static ensuresDimensionAndFillDataToArray(twoDarray: any[][], height: number, width: number,
        data: any, everyWhere: boolean): any[][];
    public static ensuresDimensionAndFillDataToArray(twoDarray: any[][], height: number, width: number,
        data: any = Constant.UTIL_NA, everyWhere: boolean = false): any[][] {
        // preconditions
        Preconditions.checkPositive(height, Msg.SHEET.INDEX_POSITIVE);
        Preconditions.checkPositive(width, Msg.SHEET.INDEX_POSITIVE);

        let createdNewArrayLocally: boolean = false;
        // verify for empty array, if so create new with initial data
        if (Predicates.IS_LIST_EMPTY.test(twoDarray)) {
            twoDarray = Util.innitializeEmptyTableArray(height, width, everyWhere ? data : "");
            createdNewArrayLocally = true;
        } else if (twoDarray.length < height) {
            // ensures height
            let numOfRowsToAdd = height - twoDarray.length;
            while (numOfRowsToAdd > 0) {
                twoDarray.push([""]);
                numOfRowsToAdd--;
            }
        } else if (twoDarray.length > height) {
            // ensures height
            let numOfRowsToRemove = twoDarray.length - height;
            while (numOfRowsToRemove > 0) {
                twoDarray.pop();
                numOfRowsToRemove--;
            }
        }
        // if created locally then set last cell and return
        if (createdNewArrayLocally && !everyWhere) {
            twoDarray[height - 1][width - 1] = data;
            return;
        }

        let isLastRowEmpty = true;
        let isLastColEmpty = true;
        for (let rowIndex = 0; rowIndex < height; rowIndex++) {
            // current row
            let innerArray = twoDarray[rowIndex];
            // ensures inner row width
            if (innerArray.length < width) {
                let numOfRowsToAdd = width - innerArray.length;
                while (numOfRowsToAdd > 0) {
                    innerArray.push([""]);
                    numOfRowsToAdd--;
                }
            } else if (innerArray.length > width) {
                let numOfRowsToRemove = innerArray.length - width;
                while (numOfRowsToRemove > 0) {
                    innerArray.pop();
                    numOfRowsToRemove--;
                }
            }
            for (let columnIndex = 0; columnIndex < width; columnIndex++) {
                let arrayValue = innerArray[columnIndex];
                // fill value everywhere
                if (everyWhere) {
                    if (Predicates.IS_BLANK.test(arrayValue)) {
                        twoDarray[rowIndex][columnIndex] = data;
                    }
                    continue;
                }
                // check for last column empty
                if (isLastColEmpty && columnIndex == (width - 1)) {
                    if (Predicates.IS_NOT_BLANK.test(arrayValue)) {
                        isLastColEmpty = false;
                    }
                }
                //check for last row empty
                if (isLastRowEmpty && rowIndex == (height - 1)) {
                    if (Predicates.IS_NOT_BLANK.test(arrayValue)) {
                        isLastRowEmpty = false;
                    }
                }
            }
        }
        // if last row or col empty fill last cell
        if ((isLastColEmpty || isLastRowEmpty) && !everyWhere) {
            twoDarray[height - 1][width - 1] = data;
        }
        return twoDarray;
    }

    /**
     * Gets the index (start from 1) of table where it starts from.
     * @param lastValuedCellIndex [optional = (0,0)] (getLastRow,getLastCol), index start from (0,0).
     * 
     * zero means no row or no col. If not provided assume index to be (0,0)
     * @param table [optional = (0,0,Constant.DEFAULT_TABLE_APPEND_DIRECTION)] ITable interface, 
     * if null assume top offset = 0, left offset = 0, 
     * and table append direction = row
     * 
     * If table append direction is row - it will try to find index in 1st row + offset, 
     * otherwise in 1st column + offset
     * @returns INDEX of table 1st cell
     */
    public static getExpectedTableStartIndex(): Index;
    public static getExpectedTableStartIndex(lastValuedCellIndex: Index, table: ITable): Index;
    public static getExpectedTableStartIndex(lastValuedCellIndex?: Index, table?: ITable): Index {
        let lastValuedRow: number = 0, lastValuedColumn: number = 0;
        if (Predicates.IS_NOT_NULL.test(lastValuedCellIndex)) {
            lastValuedRow = isNaN(lastValuedCellIndex.row) ? 0 : lastValuedCellIndex.row;
            lastValuedColumn = isNaN(lastValuedCellIndex.col) ? 0 : lastValuedCellIndex.col;
        }

        let topOffset: number = 0, leftOffset: number = 0,
            append: "row" | "col" = Constant.TABLE_APPEND_DIRECTION;
        if (Predicates.IS_NOT_NULL.test(table)) {
            topOffset = isNaN(table.TOP_OFFESET) ? 0 : table.TOP_OFFESET;
            leftOffset = isNaN(table.LEFT_OFFSET) ? 0 : table.LEFT_OFFSET;
            if (Predicates.IS_NOT_BLANK.test(table.APPEND)) {
                append = table.APPEND;
            }
        }

        let tableStartRowIndex = 1 + topOffset;
        let tableStartColIndex = 1 + leftOffset;

        if (append === "row") {
            tableStartColIndex += lastValuedColumn;
        } else {
            tableStartRowIndex += lastValuedRow;
        }
        return new Index(tableStartRowIndex, tableStartColIndex);
    }
}