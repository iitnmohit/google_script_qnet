import { TaskService } from "./TaskService";


function taskClearAllCheckBox(): void {
  let taskService = new TaskService();
  taskService.clearAllCheckbox();
  return;
}

function taskDeleteAll(): void {
  let taskService = new TaskService();
  taskService.deleteAllTasks();
  return;
}


function taskAddTop50(): void {
  let taskService = new TaskService();
  taskService.addAllTask(50);
  return;
}

function taskAddTopTen(): void {
  let taskService = new TaskService();
  taskService.addAllTask(10);
  return;
}

function taskAddOne(): void {
  let taskService = new TaskService();
  taskService.addAllTask(1);
  return;
}

function taskUpdateSelectedLog(): void {
  let taskService = new TaskService();
  taskService.updateSelectedLog();
  return;
}

function taskUpdateOneLog(): void {
  let taskService = new TaskService();
  taskService.updateSelectedLog(1);
  return;
}

