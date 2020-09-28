function clearTaskCheckBox() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NAME LIST");
  var taskColIndex = -1;
  var firstRowRangeValues = sheet.getRange(1,1,1,sheet.getMaxColumns()).getValues();
  for(var i = 0;i<sheet.getMaxColumns();i++){
    if( firstRowRangeValues[0][i] === "TASK"){
      taskColIndex = i+1;
      break;
    }
  }
  if(taskColIndex > 0){
    sheet.getRange(2,taskColIndex,sheet.getMaxRows() - 1,1).uncheck() 
  }
}

function deleteAllTasks() {
  
}


function addTasks() {
  var taskLists = Tasks.Tasklists.list();
  var hasCallingTaskList = false;
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      if(taskLists.items[i].title === "CALLINGS"){
        hasCallingTaskList = true;
        break;
      }
    }
  } 
  
  if(!hasCallingTaskList){
   // Tasks.Tasklists.insert()
  }
  
  
}

