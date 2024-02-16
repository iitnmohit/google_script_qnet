import { Lov } from "../constants/Lov";
import { Predicates } from "../library/Predicates";
import { Constant } from "../constants/Constant";

const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_ONE_MINUTE = 60 * 1000;

/**
 * Utility class for date time related query.
 */
export class DateUtil {
    /**
     * Check is a string is date or not.
     * @param date any date string
     * @Return true if valid date string, otherwise false.
     */
    public static isValid(date: string): boolean;
    public static isValid(date: string): boolean {
        if (Predicates.IS_NULL.test(date)) {
            return false;
        }
        if (date.length < 10) {
            return false;
        }
        if (date.length > 17) {
            return false;
        }
        let d = Date.parse(date);
        return !isNaN(d);
    }

    /**
 * Check is a string is date or not.
 * @param date any date string
 * @Return true if valid date string, otherwise false.
 */
    public static isValidDateOnly(date: string): boolean;
    public static isValidDateOnly(date: string): boolean {
        if (Predicates.IS_NULL.test(date)) {
            return false;
        }
        if (date.length != 11) {
            return false;
        }

        if (date.charAt(2) == '/' && date.charAt(6) == '/') {
            let d = Date.parse(date);
            return !isNaN(d);
        } else {
            return false;
        }
    }

    /**
     * Format date or string types into date or datetime string.
     * 
     * Format number of days offset from today date, into date or datetime string.
     * @param dateArg [optional] date or number of days
     * @param withTime [optional] if true then return format is "dd/MMM/yyyy HH:mm AM"
     * @Return if null, then todays date in dd/MMM/yyyy string format.
     * @Return if valid date string, then dd/MMM/yyyy string format of provided date.
     * @Return if invalid date string, then return input arg.
     * @Return if Date object then return dd/MMM/yyyy string format.
     * @return if number, then format today + numOfDaysOffset into dd/MMM/yyyy format.
     * 
     * e.g  1) 0 -> today in dd/MMM/yyyy format, 
     * 2) 3 -> (today + 3 days) in dd/MMM/yyyy format,
     * 3) -1 -> yesturday in dd/MMM/yyyy format.
     */
    public static format(): string;
    public static format(dateArg: Date): string;
    public static format(dateArg: Date, withTime: boolean): string;
    public static format(dateArg: GoogleAppsScript.Base.Date): string;
    public static format(dateArg: GoogleAppsScript.Base.Date, withTime: boolean): string;
    public static format(dateArg: string): string;
    public static format(dateArg: string, withTime: boolean): string;
    public static format(dateArg: number): string;
    public static format(dateArg: number, withTime: boolean): string;
    public static format(dateArg: Date | GoogleAppsScript.Base.Date | string | number = null,
        withTime: boolean = false): string {
        // if null return todays date
        if (dateArg === null) {
            dateArg = DateUtil.localDate();
        } else if (typeof dateArg === "string") {
            let timestamp = Date.parse(dateArg);
            if (!isNaN(timestamp)) {
                //string & valid date
                dateArg = new Date(timestamp);
            } else {
                //string & invalid date
                return dateArg;
            }
        } else if (typeof dateArg === "number") {
            let refTimestamp = DateUtil.localDate().getTime();
            let refTimestampOffset = dateArg * MILLISECONDS_IN_ONE_DAY;
            dateArg = new Date(refTimestamp + refTimestampOffset);
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

    /**
     * Convert date string in Date object
     * @param dateString [optional] date in string format
     * @returns today date, if date string is null or not provided.
     * @returns today date, if invalid date string.
     * @returns formatted date, if valid date string.
     */
    public static parse(): Date;
    public static parse(dateString: string): Date;
    public static parse(dateString: string = null): Date {
        if (Predicates.IS_NULL.test(dateString)) {
            return DateUtil.localDate();
        }
        let timestamp = Date.parse(dateString);
        if (!isNaN(timestamp)) {
            //string & valid date
            return DateUtil.localDate(new Date(timestamp));
        }
        return DateUtil.localDate();
    }

    /**
     * Get starting day Time, in date Object format.
     * @param offsetDays [optional = 0] num of days before or after today.
     * @param referenceTodayDate [optional = todays date] if provided, then provided date is consider as today.
     * @returns Date (today +- offsetDays with start day time)
     */
    public static getBeginDayDate(): GoogleAppsScript.Base.Date;
    public static getBeginDayDate(offsetDays: number): GoogleAppsScript.Base.Date;
    public static getBeginDayDate(offsetDays: number, referenceTodayDate: Date): GoogleAppsScript.Base.Date;
    public static getBeginDayDate(offsetDays: number = 0, referenceTodayDate: Date = DateUtil.localDate()): GoogleAppsScript.Base.Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        referenceTodayDate.setHours(0, 0, 0, 0);
        return new Date(referenceTodayDate.getTime() + offsetTime);
    }

    /**
     * Get End day Time, in date Object format.
     * @param offsetDays [optional = 0] num of days before or after today.
     * @param referenceTodayDate [optional = todays date] if provided, then provided date is consider as today.
     * @returns Date (today +- offsetDays with end day time)
     */
    public static getEndDayDate(): GoogleAppsScript.Base.Date;
    public static getEndDayDate(offsetDays: number): GoogleAppsScript.Base.Date;
    public static getEndDayDate(offsetDays: number, referenceTodayDate: Date): GoogleAppsScript.Base.Date;
    public static getEndDayDate(offsetDays: number = 0, referenceTodayDate: Date = DateUtil.localDate())
        : GoogleAppsScript.Base.Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        referenceTodayDate.setHours(23, 59, 59, 999);
        return new Date(referenceTodayDate.getTime() + offsetTime);
    }

    /**
     * Get week start date object.
     * @param date [optional = todays date] if provided consider provided date as a day in current week.
     * @returns if date is invalid or not provided, then current week start time
     * @returns if valid date then, start week date having provided date.
     */
    public static getBeginWeekDate(): GoogleAppsScript.Base.Date;
    public static getBeginWeekDate(date: Date): GoogleAppsScript.Base.Date;
    public static getBeginWeekDate(date: Date = DateUtil.localDate()): GoogleAppsScript.Base.Date {
        return this.getBeginDayDate(0 - DateUtil.getNumOfDaysBeforeWeekStarted(date), date);
    };

    /**
    * Get week end date object.
    * @param date [optional = todays date] if provided consider provided date as a day in current week.
    * @returns if date is invalid or not provided, then current week end time
    * @returns if valid date then, end week date having provided date.
    */
    public static getEndWeekDate(): GoogleAppsScript.Base.Date;
    public static getEndWeekDate(date: Date): GoogleAppsScript.Base.Date;
    public static getEndWeekDate(date: Date = DateUtil.localDate()): GoogleAppsScript.Base.Date {
        return this.getEndDayDate(DateUtil.getNumOfDaysAfterWeekEnds(date), date);
    }

    /**
     * Converts month number to month string (three letters).
     * @param number [optional = current month] 0 to 11
     * @returns three letter month or empty string
     * @returns current month if number arg is invalid.
     */
    public static getMonthName(): string;
    public static getMonthName(number: number): string;
    public static getMonthName(number?: number): string {
        if (Predicates.IS_NULL.test(number) || number < 0 || number > 11) {
            number = DateUtil.localDate().getMonth();
        }
        return Lov.MONTHS[number];
    }

    /**
     * Get number of days in month
     * @param month [optional = current month] month from 0 to 11
     * @param year [optional = current year] startes from 1970 till 3000
     * @returns if any of the input is not correct consider current month or year.
     */
    public static getNumberOfDaysInMonth(): number;
    public static getNumberOfDaysInMonth(month: number): number;
    public static getNumberOfDaysInMonth(month: number, year: number): number;
    public static getNumberOfDaysInMonth(month?: number, year?: number): number {
        let newDate = DateUtil.localDate();
        if (Predicates.IS_NULL.test(month) || month < 0 || month > 11) {
            month = newDate.getMonth();
        }
        if (Predicates.IS_NULL.test(year) || year < 1970 || year > 3000) {
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
     * Get to know that how many days before week has been started.
     * @param date [optional = todays date] if provided, consider this as todays date.
     * @param date invalid string, consider todays date.
     * @returns num of days before week started (e.g. 0 ,1 , 2  etc)
     */
    public static getNumOfDaysBeforeWeekStarted(): number;
    public static getNumOfDaysBeforeWeekStarted(date: Date): number;
    public static getNumOfDaysBeforeWeekStarted(date: GoogleAppsScript.Base.Date): number;
    public static getNumOfDaysBeforeWeekStarted(date: string): number;
    public static getNumOfDaysBeforeWeekStarted(date?: Date | GoogleAppsScript.Base.Date | string): number {
        let refDate: Date | GoogleAppsScript.Base.Date = DateUtil.localDate();
        if (Predicates.IS_NULL.test(date)) {
        } else if (typeof date === "string") {
            refDate = DateUtil.parse(date);
        } else {
            refDate = date;
        }
        let day = refDate.getDay();
        switch (Constant.CALENDER_START_WEEK_DAY) {
            case CalendarApp.Weekday.SUNDAY: return day;
            case CalendarApp.Weekday.MONDAY: return (day + 6) % 7;
            case CalendarApp.Weekday.TUESDAY: return (day + 5) % 7;
            case CalendarApp.Weekday.WEDNESDAY: return (day + 4) % 7;
            case CalendarApp.Weekday.THURSDAY: return (day + 3) % 7;
            case CalendarApp.Weekday.FRIDAY: return (day + 2) % 7;
            case CalendarApp.Weekday.SATURDAY: return (day + 1) % 7;
            default: return day;
        }
    }

    /**
     * Get to know that how many days after week ends.
     * @param date [optional = todays date] if provided valid, consider this as todays date.
     * @returns num of days after week ends (e.g. 0 ,1 , 2  etc)
     */
    public static getNumOfDaysAfterWeekEnds(): number;
    public static getNumOfDaysAfterWeekEnds(date: Date): number;
    public static getNumOfDaysAfterWeekEnds(date: GoogleAppsScript.Base.Date): number;
    public static getNumOfDaysAfterWeekEnds(date: string): number;
    public static getNumOfDaysAfterWeekEnds(date?: Date | GoogleAppsScript.Base.Date | string): number {
        let refDate: Date | GoogleAppsScript.Base.Date = DateUtil.localDate();
        if (Predicates.IS_NULL.test(date)) {
        } else if (typeof date === "string") {
            refDate = DateUtil.parse(date);
        } else {
            refDate = date;
        }
        let day = refDate.getDay();
        switch (Constant.CALENDER_START_WEEK_DAY) {
            case CalendarApp.Weekday.SUNDAY: return 6 - day;
            case CalendarApp.Weekday.MONDAY: return 6 - ((day + 6) % 7);
            case CalendarApp.Weekday.TUESDAY: return 6 - ((day + 5) % 7);
            case CalendarApp.Weekday.WEDNESDAY: return 6 - ((day + 4) % 7);
            case CalendarApp.Weekday.THURSDAY: return 6 - ((day + 3) % 7);
            case CalendarApp.Weekday.FRIDAY: return 6 - ((day + 2) % 7);
            case CalendarApp.Weekday.SATURDAY: return 6 - ((day + 1) % 7);
            default: return 6 - day;
        }
    }

    /**
     * use this in stead of new Date().
     * 
     * converts date into time zone provided in property file.
     * @param refDate [optional = todays date] date to be converted to local date.
     * @returns new date as per calender time zone
     */
    public static localDate(): Date;
    public static localDate(refDate: Date): Date;
    public static localDate(refDate: GoogleAppsScript.Base.Date): Date;
    public static localDate(refDate: Date | GoogleAppsScript.Base.Date = new Date()): Date {
        let refTime = refDate.getTime();
        let refTimeOffset = refDate.getTimezoneOffset(); //IN MINUTES
        let utcTime = refTime + (refTimeOffset * MILLISECONDS_IN_ONE_MINUTE);
        let localTimeOffsetInmilliSec = Constant.CALENDER_LOCAL_COUNTRY_TIME_OFFSET_IN_MINUTES * MILLISECONDS_IN_ONE_MINUTE;

        let localDate = new Date(utcTime + localTimeOffsetInmilliSec);
        return localDate;
    }
}