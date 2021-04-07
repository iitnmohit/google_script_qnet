import { DateUtil } from "../util/DateUtil";

export class Constant {
    // TASK constants
    public static readonly TASK_LIST_NAME: string = "QNET";
    public static readonly TASK_MAX_UPDATE_COUNT: number = 50;
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
    public static readonly CALENDER_INVITE_EVENT_TITLE = "Business Discussion with %s";
    public static readonly CALENDER_INVITE_EVENT_DURATION_IN_MINUTES = 170;


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
        ["cnp", " • call not picked"],
        ["ttyl", " • talk to you later"],
        ["ctc", " • cut the call"],
        ["oon", " • out of network"],
        ["nrow", " • no reply on whats app"],
        ["noc", " • no reply on chat"]
    ]);

    // MESSAGE

    // PROPERTY
    public static readonly CALENDER_ZOOM_MEETING_LINK_KEY = "zoomMeetingLinkKey";
    public static readonly CALENDER_ZOOM_MEETING_LINK_MSG = "Please provide Meeting link.";

    public static readonly CALENDER_INVITE_MEETING_DESCRIPTION_KEY = "inviteMeetingDescription";
    public static readonly CALENDER_INVITE_MEETING_DESCRIPTION_MSG = "Enter Invite Description.";

}