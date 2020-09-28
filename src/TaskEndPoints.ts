import { TaskService } from "./TaskService";


function taskClearAllCheckBox() {
  let taskService = new TaskService();
  taskService.clearAllCheckbox();
}

function deleteAllTasks() {

}


function addTasks() {
  var taskLists = Tasks.Tasklists.list();
  var hasCallingTaskList = false;
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      if (taskLists.items[i].title === "CALLINGS") {
        hasCallingTaskList = true;
        break;
      }
    }
  }

  if (!hasCallingTaskList) {
    // Tasks.Tasklists.insert()
  }


}

