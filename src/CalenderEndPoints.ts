import { runSafely } from "./Code";
import { CalenderService } from "./service/CalenderService";
import { DateUtil } from "./util/DateUtil";

function deleteSelectedCalenderEvents(): void {
    runSafely((): void => {
        new CalenderService().deleteSelectedEvent(50);
    });
}

function sync_todays_events(): void {
    runSafely((): void => {
        new CalenderService().syncEvent(0, 0);
    });
}

function sync_currentWeek_events(): void {
    runSafely((): void => {
        let date = new Date();
        let weekDay = date.getDay();
        new CalenderService().syncEvent(0 - weekDay, 6 - weekDay);
    });
}

function sync_current_month_events(): void {
    runSafely((): void => {
        let date = new Date();
        let dateOfMonth = date.getDate();
        let totaldaysInMOnth = DateUtil.getNumberOfDaysInMonth(date.getMonth());
        new CalenderService().syncEvent(1 - dateOfMonth, totaldaysInMOnth - dateOfMonth);
    });
}

function sync_before_30days_events(): void {
    runSafely((): void => {
        new CalenderService().syncEvent(-30, 0);
    });
}

function sync_before_90days_events(): void {
    runSafely((): void => {
        new CalenderService().syncEvent(-90, 0);
    });
}



