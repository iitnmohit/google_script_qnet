import { runSafely } from "./Code";
import { CallLogService } from "./service/CallLogService";

function logUpdateOne(): void {
    runSafely((): void => {
        new CallLogService().addSelectedLog(1);
    });
}

function logUpdateTen(): void {
    runSafely((): void => {
        new CallLogService().addSelectedLog(10);
    });
}

function logUpdateTwenty(): void {
    runSafely((): void => {
        new CallLogService().addSelectedLog(20);
    });
}