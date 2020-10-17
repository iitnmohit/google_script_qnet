import { Lov } from "../constants/Lov";
import { Predicates } from "../library/Predicates";
import { Calender } from "../constants/Calender";

const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_ONE_MINUTE = 60 * 1000;

export class DateUtil {
    /**
     * @param date any date string
     * @Return true if valid date or false
     */
    public static isValid(date: string): boolean {
        let d = Date.parse(date);
        return !isNaN(d);
    }

    /**
     * @param dateArg date input
     * @param withTime if true then return format is "dd/MMM/yyyy HH:mm AM"
     * @Return if null then todays date in dd/MMM/yyyy string format.
     * @Return if string & valid date then dd/MMM/yyyy string format.
     * @Return if string & invalid date then return input arg.
     * @Return if Date object then return dd/MMM/yyyy string format.
     * 
     */
    public static format(dateArg: Date | GoogleAppsScript.Base.Date | string | null = null,
        withTime: boolean = false): string {
        // if null return todays date
        if (dateArg === null) {
            let _timestring = Utilities.formatDate(new Date(), "GMT+5:30", "dd-MMM-yyyy HH:mm:ss");
            dateArg = new Date(_timestring);
        }

        if (typeof dateArg === "string") {
            let _timestamp = Date.parse(dateArg);
            if (!isNaN(_timestamp)) {
                //string & valid date
                dateArg = new Date(_timestamp);
            } else {
                //string & invalid date
                return dateArg;
            }
        }
        let month = DateUtil.getMonthName(dateArg.getMonth());
        let day = String(dateArg.getDate());
        let year = dateArg.getFullYear();
        let hour = dateArg.getHours();
        let min = dateArg.getMinutes();
        let amPm = "AM";

        if (day.length < 2) {
            day = '0' + day;
        }
        if (hour > 11) {
            hour = hour - 12;
            amPm = "PM";
        }
        if (withTime) {
            return `${day}/${month}/${year} ${hour}:${min} ${amPm}`;
        } else {
            return `${day}/${month}/${year}`;
        }
    }

    public static parse(dateString: string): Date {
        let _timestamp = Date.parse(dateString);
        if (!isNaN(_timestamp)) {
            //string & valid date
            return DateUtil.localDate(new Date(_timestamp));
        }
        return DateUtil.localDate();
    }

    /**
     * 
     * @param offsetDays num of days after(+) or before(-) today
     * @returns Date (today +- offsetDays with start day time)
     */
    public static getBeginDayDate(offsetDays: number = 0, todayDate: Date = DateUtil.localDate()): GoogleAppsScript.Base.Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        todayDate.setHours(0, 0, 0, 0);
        return new Date(todayDate.getTime() + offsetTime);
    }

    /**
     * 
     * @param offsetDays num of days after(+) or before(-) today
     * @returns Date (today +- offsetDays with end day time)
     */
    public static getEndDayDate(offsetDays: number = 0, todayDate: Date = DateUtil.localDate()): Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        todayDate.setHours(23, 59, 59, 999);
        return new Date(todayDate.getTime() + offsetTime);
    }

    public static getBeginWeekDate(date: string): GoogleAppsScript.Base.Date {
        let _date = this.parse(date);
        return this.getBeginDayDate(DateUtil.getNumOfDaysBeforeWeekStarted(_date), _date);
    }

    public static getEndWeekDate(date: string): GoogleAppsScript.Base.Date {
        let _date = this.parse(date);
        return this.getEndDayDate(DateUtil.getNumOfDaysAfterWeekEnds(_date), _date);
    }

    /**
     * 
     * @param number 0 to 11
     * @returns three letter month or empty string
     */
    private static getMonthName(number: number): string {
        if (Predicates.IS_NULL.test(number)) {
            return "";
        }
        if (number < 0 || number > 11) {
            return "";
        }
        return Lov.MONTHS[number];
    }

    /**
     * 
     * @param month month from 0 to 11
     */
    public static getNumberOfDaysInMonth(month?: number, year?: number): number {
        let newDate = DateUtil.localDate();
        if (Predicates.IS_NULL.test(month)) {
            month = newDate.getMonth();
        }
        if (Predicates.IS_NULL.test(year)) {
            year = newDate.getFullYear();
        }
        let isLeapYear: boolean = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
        switch (month + 1) {
            case 1: return 31;//jan
            case 2: return isLeapYear ? 29 : 28;//feb
            case 3: return 31;//march
            case 4: return 30;//april
            case 5: return 31;//may
            case 6: return 30;//june
            case 7: return 31;//july
            case 8: return 31;//aug
            case 9: return 30;//sep
            case 10: return 31;//oct
            case 11: return 30;//nov
            case 12: return 31;//dec
            default: return 30;
        }
    }

    /**
     * 
     * @param date nothing or null for today date, date compare to
     * returns negative or zero number, i.e. num of days before week started
     */
    public static getNumOfDaysBeforeWeekStarted(date?: Date | GoogleAppsScript.Base.Date | string): number {
        let refDate: Date | GoogleAppsScript.Base.Date = new Date();
        if (Predicates.IS_NULL.test(date)) {
        } else if (typeof date === "string") {
            refDate = DateUtil.parse(date);
        } else {
            refDate = date;
        }
        let localDate = DateUtil.localDate(refDate);
        var day = localDate.getDay();
        switch (Calender.START_WEEK_DAY) {
            case CalendarApp.Weekday.SUNDAY: return 0 - day;
            case CalendarApp.Weekday.MONDAY: return 0 - ((day + 6) % 7);
            case CalendarApp.Weekday.TUESDAY: return 0 - ((day + 5) % 7);
            case CalendarApp.Weekday.WEDNESDAY: return 0 - ((day + 4) % 7);
            case CalendarApp.Weekday.THURSDAY: return 0 - ((day + 3) % 7);
            case CalendarApp.Weekday.FRIDAY: return 0 - ((day + 2) % 7);
            case CalendarApp.Weekday.SATURDAY: return 0 - ((day + 1) % 7);
            default: return 0 - day;
        }
    }

    /**
     * 
     * @param date nothing or null for today date, date compare to
     * returns positive or zero number, i.e. num of days after week ends
     */
    public static getNumOfDaysAfterWeekEnds(date?: Date | GoogleAppsScript.Base.Date | string): number {
        return 6 + DateUtil.getNumOfDaysBeforeWeekStarted(date);
    }

    /**
     * use this in stead of new Date()
     * @param refDate 
     * @returns new date as per calender property
     */
    public static localDate(refDate: Date | GoogleAppsScript.Base.Date = new Date()) {
        let refTime = refDate.getTime();
        let refTimeOffset = refDate.getTimezoneOffset(); //IN MINUTES
        let utcTime = refTime + (refTimeOffset * MILLISECONDS_IN_ONE_MINUTE);
        let localTimeOffsetInmilliSec = Calender.LOCAL_COUNTRY_OFFSET_IN_MINUTES * MILLISECONDS_IN_ONE_MINUTE;

        let localDate = new Date(utcTime + localTimeOffsetInmilliSec);
        return localDate;
    }
}