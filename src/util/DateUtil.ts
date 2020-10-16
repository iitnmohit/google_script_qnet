import { Lov } from "../constants/Lov";
import { Predicates } from "../library/Predicates";

const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
export class DateUtil {
    /**
     * @param date any date string
     * @Return true if valid date or false
     */
    public static isValidDate(date: string): boolean {
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
    public static formatDate(dateArg: Date | GoogleAppsScript.Base.Date | string | null = null,
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

    public static getDate(dateString: string): Date {
        let _timestamp = Date.parse(dateString);
        if (!isNaN(_timestamp)) {
            //string & valid date
            return new Date(_timestamp);
        }
        return new Date();
    }

    /**
     * 
     * @param offsetDays num of days after(+) or before(-) today
     * @returns Date (today +- offsetDays with end day time)
     */
    public static getEodDate(offsetDays: number = 0, todayDate: Date = new Date()): Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        todayDate.setHours(23, 59, 59, 999);
        return new Date(todayDate.getTime() + offsetTime);
    }

    /**
     * 
     * @param offsetDays num of days after(+) or before(-) today
     * @returns Date (today +- offsetDays with start day time)
     */
    public static getBeginDate(offsetDays: number = 0, todayDate: Date = new Date()): GoogleAppsScript.Base.Date {
        let offsetTime = offsetDays * MILLISECONDS_IN_ONE_DAY;
        todayDate.setHours(0, 0, 0, 0);
        return new Date(todayDate.getTime() + offsetTime);
    }

    public static getStartWeekTime(date: string): GoogleAppsScript.Base.Date {
        let _date = this.getDate(date);
        let weekDay = _date.getDay();//0 to 6
        return this.getBeginDate(0 - weekDay, _date);
    }

    public static getEndWeekTime(date: string): GoogleAppsScript.Base.Date {
        let _date = this.getDate(date);
        let weekDay = _date.getDay();//0 to 6
        return this.getEodDate(6 - weekDay, _date);
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
}