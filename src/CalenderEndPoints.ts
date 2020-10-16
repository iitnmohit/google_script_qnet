import { runSafely } from "./Code";
import { CalenderService } from "./service/CalenderService";

function deleteSelectedCalenderEvents(): void {
    runSafely((): void => {
        new CalenderService().deleteSelectedEvent(50);
    });
}

function sync_before_30days_after_0days_events(): void {
    runSafely((): void => {
        new CalenderService().syncEvent(-30, 0);
    });
}