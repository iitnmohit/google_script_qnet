declare const exports: typeof import('./Code');
import { Constant } from "./constants/Constant";
import { UserPropertyService } from "./service/UserPropertyService";

function resetMeetingLinkProperty(): void {
    exports.runSafely((): void => {
        UserPropertyService.get(Constant.CALENDER_ZOOM_MEETING_LINK_KEY,
            Constant.CALENDER_ZOOM_MEETING_LINK_MSG,
            true);
    });
}

function resetInviteMeetingDescription(): void {
    exports.runSafely((): void => {
        UserPropertyService.get(Constant.CALENDER_INVITE_MEETING_DESCRIPTION_KEY,
            Constant.CALENDER_INVITE_MEETING_DESCRIPTION_MSG,
            true);
    });
}

function resetLogUpdateDate(): void {
    exports.runSafely((): void => {
        UserPropertyService.get(Constant.LOG_UPDATE_DATE_KEY,
            Constant.LOG_UPDATE_DATA_MSG,
            true);
    });
}