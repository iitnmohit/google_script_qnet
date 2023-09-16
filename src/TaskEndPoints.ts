declare const exports: typeof import('./Code');
import { Msg } from "./constants/Message";
import { TaskService } from "./service/TaskService";
import { UiService } from "./service/UiService";

function taskDeleteAll(): void {
  if (UiService.doesUserReConfirmedAction(Msg.UI.MSG_DELETE_ALERT)) {
    exports.runSafely((): void => {
      new TaskService().deleteAllTasks();
    });
  }
}

function taskAddTop50(): void {
  exports.runSafely((): void => {
    new TaskService().addAllTask(50);
  });
}

function taskAddTopTen(): void {
  exports.runSafely((): void => {
    new TaskService().addAllTask(10);
  });
}

function taskAddOne(): void {
  exports.runSafely((): void => {
    new TaskService().addAllTask(1);
  });
}

function taskUpdateSelectedLog(): void {
  exports.runSafely((): void => {
    new TaskService().updateSelectedLog(10);
  });
}

function taskUpdateOneLog(): void {
  exports.runSafely((): void => {
    new TaskService().updateSelectedLog(1);
  });
}

function taskUpdateSelectedFiftyLog(): void {
  exports.runSafely((): void => {
    new TaskService().updateSelectedLog(50);
  });
}