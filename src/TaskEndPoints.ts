import { TaskService } from "./TaskService";


function taskClearAllCheckBox():void {
  let taskService = new TaskService();
  taskService.clearAllCheckbox();
  return;
}

function taskDeleteAll():void {
  let taskService = new TaskService();
  taskService.deleteAllTasks();
  return;
}


function taskAddAll():void {
  let taskService = new TaskService();
  taskService.addAllTask();
  return;
}

function taskAddTopTen():void {
  let taskService = new TaskService();
  taskService.addAllTask(10);
  return;
}

function taskUpdateSelectedLog():void {
  let taskService = new TaskService();
  taskService.updateSelectedLog();
  return;
}

