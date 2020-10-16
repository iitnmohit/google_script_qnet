import { Log } from "../constants/Log";
import { ITable } from "../interface/ISheet";
import { Index } from "../library/Index";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { DateUtil } from "./DateUtil";

export class Util {
    public static arrayOfArray<T>(array: Array<T>): Array<Array<T>> {
        return array.map((t): Array<T> => {
            return [t];
        });
    }

    public static formatUpdateLog(log: string, todayDate?: string): string {
        if (Predicates.IS_BLANK.test(log)) {
            return "";
        }
        let formatedLog: string = "";
        let lines: string[] = log.split("\n");

        for (let i = 0; i < lines.length; i++) {
            let eachLine = lines[i].replace("•", "").replace("-", "").trim();
            if (Predicates.IS_BLANK.test(eachLine)) {
                continue;
            }

            if (DateUtil.isValidDate(eachLine)) {
                formatedLog = formatedLog + "\n\n" + DateUtil.formatDate(eachLine);
                continue;
            }

            if (eachLine.toLocaleLowerCase() === Log.TEXT_TO_REPLACE_WITH_TODAYS_DATE) {
                if (DateUtil.isValidDate(todayDate)) {
                    formatedLog = formatedLog + "\n\n" + DateUtil.formatDate(todayDate);
                } else {
                    formatedLog = formatedLog + "\n\n" + DateUtil.formatDate();
                }
                continue;
            }

            formatedLog = formatedLog + "\n" + " • " + eachLine;
        }
        return formatedLog.trim();
    }

    public static getColumnA1Notation(colIndex: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number): string;
    public static getColumnA1Notation(colIndex: number, beginRow: number, sheetName: string): string;
    public static getColumnA1Notation(colIndex: number, beginRow?: number, sheetName?: string): string {
        Preconditions.checkPositive(colIndex, "col index invalid");

        let colLetter = Util.getColumnLetter(colIndex);
        let beginRowNum = "";
        if (beginRow > 1) {
            beginRowNum += beginRow;
        }
        if (Predicates.IS_NULL.test(sheetName)) {
            return `${colLetter}${beginRowNum}:${colLetter}`;
        } else {
            return `'${sheetName}'!${colLetter}${beginRowNum}:${colLetter}`;
        }
    }

    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range): string;
    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range, sheetName: string): string;
    public static getRangeA1Notation(range: GoogleAppsScript.Spreadsheet.Range, sheetName?: string): string {
        Preconditions.checkNotNull(range, "Invalid Range");
        if (Predicates.IS_NULL.test(sheetName)) {
            return range.getA1Notation();
        } else {
            return sheetName + "!" + range.getA1Notation();
        }
    }

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
            default: throw new Error("not implemented yet");
        }
    }

    public static innitializeEmptyTableArray(height: number, width: number): any[][] {
        Preconditions.checkPositive(height);
        Preconditions.checkPositive(width);

        let _dataArray = [];
        for (let _i = 0; _i < height; _i++) {
            let _tempArray = [];
            for (let _j = 0; _j < width; _j++) {
                _tempArray.push("");
            }
            _dataArray.push(_tempArray);
        }
        return _dataArray;
    }

    public static validateAndFillDummyData(twoDarray: any[][], height: number, width: number): any[][];
    public static validateAndFillDummyData(twoDarray: any[][], height: number, width: number, data: any): any[][];
    public static validateAndFillDummyData(twoDarray: any[][], height: number, width: number, data: any, everyWhere: boolean): any[][];
    public static validateAndFillDummyData(twoDarray: any[][], height: number, width: number, data: any = "NA", everyWhere: boolean = false): any[][] {
        Preconditions.checkNotNull(twoDarray);
        Preconditions.checkNotBlank(data);
        Preconditions.checkNotNull(everyWhere);
        Preconditions.checkArgument(twoDarray.length == height);

        let _isLastRowEmpty = true;
        let _isLastColEmpty = true;
        for (let _rowInd_ = 0; _rowInd_ < height; _rowInd_++) {
            // current row
            let _row = twoDarray[_rowInd_];
            Preconditions.checkArgument(_row.length == width);
            for (let _colInd_ = 0; _colInd_ < width; _colInd_++) {
                let _val = _row[_colInd_];
                // fill value everywhere
                if (everyWhere) {
                    if (Predicates.IS_BLANK.test(_val)) {
                        twoDarray[_rowInd_][_colInd_] = data;
                    }
                    continue;
                }
                // check for last column empty
                if (_isLastColEmpty && _colInd_ == (width - 1)) {
                    if (Predicates.IS_NOT_BLANK.test(_val)) {
                        _isLastColEmpty = false;
                    }
                }
                //check for last row empty
                if (_isLastRowEmpty && _rowInd_ == (height - 1)) {
                    if (Predicates.IS_NOT_BLANK.test(_val)) {
                        _isLastRowEmpty = false;
                    }
                }
            }
        }
        if ((_isLastColEmpty || _isLastRowEmpty) && !everyWhere) {
            twoDarray[height - 1][width - 1] = data;
        }
        return twoDarray;
    }

    public static getTableIndex(lastValuedCellIndex: Index, table: ITable): Index {
        Preconditions.checkNotNull(lastValuedCellIndex);
        Preconditions.checkNotNull(table);
        Preconditions.checkNotNull(table.TOP_OFFESET);
        Preconditions.checkNotNull(table.LEFT_OFFSET);

        let tableStartRowIndex = 1 + table.TOP_OFFESET;
        let tableStartColIndex = 1 + table.LEFT_OFFSET;

        if (table.APPEND === "row") {
            tableStartColIndex += lastValuedCellIndex.col;
        } else {
            tableStartRowIndex += lastValuedCellIndex.row;
        }
        return new Index(tableStartRowIndex, tableStartColIndex);
    }
}