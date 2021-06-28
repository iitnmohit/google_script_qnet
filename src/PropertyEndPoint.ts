import { runSafely } from "./Code";
import { Constant } from "./constants/Constant";
import { UserPropertyService } from "./service/UserPropertyService";

function resetMeetingLinkProperty(): void {
    runSafely((): void => {
        UserPropertyService.get(Constant.CALENDER_ZOOM_MEETING_LINK_KEY,
            Constant.CALENDER_ZOOM_MEETING_LINK_MSG,
            true);
    });
}

function resetInviteMeetingDescription(): void {
    runSafely((): void => {
        UserPropertyService.get(Constant.CALENDER_INVITE_MEETING_DESCRIPTION_KEY,
            Constant.CALENDER_INVITE_MEETING_DESCRIPTION_MSG,
            true);
    });
}

function resetLogUpdateDate(): void {
    runSafely((): void => {
        UserPropertyService.get(Constant.LOG_UPDATE_DATE_KEY,
            Constant.LOG_UPDATE_DATA_MSG,
            true);
    });
}