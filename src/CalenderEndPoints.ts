import { runSafely } from "./Code";
import { CalenderService } from "./service/CalenderService";
import { UiService } from "./service/UiService";
import { DateUtil } from "./util/DateUtil";

function deleteSelectedCalenderEvents(): void {
    if (!UiService.doesUserReConfirmedAction("This will delete the events from calender," +
        " and can be found in calender trash.\nOnly 50 events will be deleted in one go.\n" +
        "Proceed to continue.")) {
        return;
    }
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
        new CalenderService().syncEvent(DateUtil.getNumOfDaysBeforeWeekStarted(),
            DateUtil.getNumOfDaysAfterWeekEnds());
    });
}

function sync_current_prev_next_Week_events(): void {
    runSafely((): void => {
        new CalenderService().syncEvent(DateUtil.getNumOfDaysBeforeWeekStarted() - 7,
            DateUtil.getNumOfDaysAfterWeekEnds() + 7);
    });
}

function sync_current_month_events(): void {
    runSafely((): void => {
        let date = DateUtil.localDate();
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