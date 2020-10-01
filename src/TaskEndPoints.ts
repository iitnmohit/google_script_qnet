import { runSafely, runSafelyWithParam } from "./Code";
import { TaskService } from "./service/TaskService";


function taskClearAllCheckBox(): void {
  runSafely(new TaskService().clearAllCheckbox);
}

function taskDeleteAll(): void {
  runSafely(new TaskService().deleteAllTasks);
}

function taskAddTop50(): void {
  runSafelyWithParam(50, new TaskService().addAllTask);
}

function taskAddTopTen(): void {
  runSafelyWithParam(10, new TaskService().addAllTask);
}

function taskAddOne(): void {
  runSafelyWithParam(1, new TaskService().addAllTask);
}

function taskUpdateSelectedLog(): void {
  runSafelyWithParam(10, new TaskService().updateSelectedLog);
}

function taskUpdateOneLog(): void {
  runSafelyWithParam(1, new TaskService().updateSelectedLog);
}