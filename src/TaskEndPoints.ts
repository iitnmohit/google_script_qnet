import { TaskService } from "./TaskService";


function taskClearAllCheckBox() {
  let taskService = new TaskService();
  taskService.clearAllCheckbox();
}

function taskDeleteAll() {
  let taskService = new TaskService();
  taskService.deleteAllTasks();
}


function taskAddAll() {
  let taskService = new TaskService();
  taskService.addAllTask();
}

