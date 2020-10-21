import { DateUtil } from "../util/DateUtil";

export class Log {
    public static readonly MAX_LOG_UPDATE: number = 50;
    // this will add new line above replacement in log
    public static readonly TEXT_TO_REPLACE_FUNCTION_MAP: Map<string, (todayDate: Date) => string> = new Map([
        ["today", DateUtil.format]
    ]);
    // this will simply replace line as below in log
    public static readonly TEXT_TO_REPLACE_MAP: Map<string, string> = new Map([
        ["__test", "__test"]
    ]);
}