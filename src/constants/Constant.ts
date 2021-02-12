import { DateUtil } from "../util/DateUtil";

export class Constant {
    // TASK constants
    public static readonly TASK_LIST_NAME: string = "QNET";
    public static readonly TASK_MAX_UPDATE_COUNT: number = 10;
    public static readonly TASK_MAX_CREATE_COUNT: number = 100;

    //UTIL constants
    public static readonly UTIL_NA: string = "NA";

    // table
    public static readonly TABLE_APPEND_DIRECTION: "row" | "col" = "row";

    // calender
    public static readonly CALENDER_NAME: string = "Business";
    public static readonly CALENDER_TIMEZONE = "Asia/Kolkata";
    public static readonly CALENDER_COLOR = CalendarApp.Color.ORANGE;
    public static readonly CALENDER_MAX_EVENT_DELETE: number = 50;
    public static readonly CALENDER_MAX_EVENT_CREATE: number = 5;
    public static readonly CALENDER_SKIP: Array<string> = [
        "Holidays in India"
    ];
    public static readonly CALENDER_START_WEEK_DAY = CalendarApp.Weekday.SATURDAY;
    public static readonly CALENDER_LOCAL_COUNTRY_TIME_OFFSET_IN_MINUTES = +330; // (5*60)+30
    public static readonly CALENDER_RECONFIRM_FOR_DELETE_MSG = "This will delete the events from calender," +
        " and can be found in calender trash.\nOnly 50 events will be deleted in one go.\n" +
        "Proceed to continue.";

    // logs
    public static readonly LOG_MAX_UPDATE_COUNT: number = 50;
    // this will add new line above replacement in log
    public static readonly LOG_TEXT_TO_REPLACE_FUNCTION_MAP: Map<string, (todayDate: Date) => string> = new Map([
        ["today", (todaysDate: Date): string => {
            return DateUtil.format(todaysDate);
        }]
    ]);
    // this will simply replace line as below in log
    public static readonly LOG_TEXT_TO_REPLACE_MAP: Map<string, string> = new Map([
        ["__test", "__test"]
    ]);

    // MESSAGE


}