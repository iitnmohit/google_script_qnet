import { runSafely } from "./Code";
import { Msg } from "./constants/Message";
import { TaskService } from "./service/TaskService";
import { UiService } from "./service/UiService";

function taskDeleteAll(): void {
  if (UiService.doesUserReConfirmedAction(Msg.UI.MSG_DELETE_ALERT)) {
    runSafely((): void => {
      new TaskService().deleteAllTasks();
    });
  }
}

function taskAddTop50(): void {
  runSafely((): void => {
    new TaskService().addAllTask(50);
  });
}

function taskAddTopTen(): void {
  runSafely((): void => {
    new TaskService().addAllTask(10);
  });
}

function taskAddOne(): void {
  runSafely((): void => {
    new TaskService().addAllTask(1);
  });
}

function taskUpdateSelectedLog(): void {
  runSafely((): void => {
    new TaskService().updateSelectedLog(10);
  });
}

function taskUpdateOneLog(): void {
  runSafely((): void => {
    new TaskService().updateSelectedLog(1);
  });
}