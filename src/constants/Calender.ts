export class Calender {
    public static readonly MAX_EVENT_DELETE: number = 50;
    public static readonly SKIP_CALENDER: Array<string> = ["Holidays in India"];
    public static readonly START_WEEK_DAY = CalendarApp.Weekday.SATURDAY;
    public static readonly LOCAL_COUNTRY_OFFSET_IN_MINUTES = +330; // (5*60)+30
}