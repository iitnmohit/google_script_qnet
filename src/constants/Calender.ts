export class Calender {
    public static readonly MAX_EVENT_DELETE: number = 50;
    public static readonly SKIP_CALENDER: Array<string> = ["Holidays in India"];
    public static readonly START_WEEK_DAY = CalendarApp.Weekday.SATURDAY;
    public static readonly LOCAL_COUNTRY_OFFSET_IN_MINUTES = +330; // (5*60)+30
    public static readonly RECONFIRM_FOR_DELETE = "This will delete the events from calender," +
        " and can be found in calender trash.\nOnly 50 events will be deleted in one go.\n" +
        "Proceed to continue.";
}