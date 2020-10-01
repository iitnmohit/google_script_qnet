import { runSafely } from "./Code";
import { TaskSchema } from "./schemas/TaskSchema";
import { TaskService } from "./service/TaskService";
import { UiService } from "./service/UiService";


function taskClearAllCheckBox(): void {
  runSafely((): void => {
    new TaskService().clearAllCheckbox();
  });
}

function taskDeleteAll(): void {
  if (UiService.doesUserReConfirmedAction(TaskSchema.MSG_DELETE_ALERT)) {
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