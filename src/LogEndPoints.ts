declare const exports: typeof import('./Code');
import { CallLogService } from "./service/CallLogService";

function logUpdateOne(): void {
    exports.runSafely((): void => {
        new CallLogService().addSelectedLog(1);
    });
}

function logUpdateTen(): void {
    exports.runSafely((): void => {
        new CallLogService().addSelectedLog(10);
    });
}

function logUpdateTwenty(): void {
    exports.runSafely((): void => {
        new CallLogService().addSelectedLog(20);
    });
}

function copyLastLog(): void {
    exports.runSafely((): void => {
        new CallLogService().copyLastLog(50);
    });
}
