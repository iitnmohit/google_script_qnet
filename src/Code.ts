function onOpen(event:GoogleAppsScript.Events.SheetsOnOpen) {
  event.source.addMenu(
    'Business',[{
        name : 'Clear Task CheckBox',
        functionName : 'clearTaskCheckBox'
      },{
        name : 'Delete All Tasks',
        functionName : 'deleteAllTasks'
      },{
        name : 'Add Tasks',
        functionName : 'addTasks'
      }
    ]
  );
  // SpreadsheetApp.getUi()
  //     .createMenu('Business')
  //     .addItem('Clear Task CheckBox', 'clearTaskCheckBox')
  //     .addItem('Delete All Tasks', 'deleteAllTasks')
  //     .addItem('Add Tasks', 'addTasks')
  //     .addSeparator()
  //     .addToUi();
}



function onEdit(e) {
  Logger.log("onEdit");
  var range = e.range;
  var sheet = range.getSheet();
  if(sheet.getName() === "NAME LIST"){
    var colIndex = range.getColumn();
    var colHeader = sheet.getRange(1, colIndex).getValue();
    if(colHeader === "UPDATED"){
      Logger.log("update checkbox ticked");
      var rowIndex = range.getRow();
      var dateColIndex = -1;
      var nameColIndex = -1;
      var logColIndex = -1;
      var firstRowRangeValues = sheet.getRange(1,1,1,sheet.getMaxColumns()).getValues();
      for(var i = 0;i<sheet.getMaxColumns();i++){
        if( firstRowRangeValues[0][i] === "UPDATED ON"){
          dateColIndex = i+1;
        }else if( firstRowRangeValues[0][i] === "NAME"){
          nameColIndex = i+1;
        }else if( firstRowRangeValues[0][i] === "ADD LOG"){
          logColIndex = i+1;
        }
      }
      Logger.log("dateColIndex = "+dateColIndex);
      Logger.log("nameColIndex = "+nameColIndex);
      Logger.log("logColIndex = "+logColIndex);
      Logger.log("rowIndex = "+rowIndex);
      if(dateColIndex != -1){
        if(range.isChecked()){
          sheet.getRange( rowIndex, dateColIndex).setValue(new Date());
        }else{
         sheet.getRange( rowIndex, dateColIndex).clear({contentsOnly: true});
        }
      }
      Logger.log("Date cell updated");
      if(logColIndex != -1){
        if(range.isChecked()){
          if(nameColIndex != -1){
            var oldNote = sheet.getRange( rowIndex, nameColIndex).getNote();
            if(oldNote.length > 0){
              oldNote = oldNote + "\n\n";
            }
            var newNote = sheet.getRange( rowIndex, logColIndex).getValue().trim();
            if(newNote.length > 0) {
              var updatedNote = oldNote + Utilities.formatDate(new Date(), "GMT+5:30", "dd-MMM-yyyy") + "\n" + newNote; 
              sheet.getRange( rowIndex, nameColIndex).setNote(updatedNote);
              sheet.getRange( rowIndex, logColIndex).setValue("UPDATED!");
            }
          }
        }else{
          sheet.getRange( rowIndex, logColIndex).clear({contentsOnly: true});
        }
      }
      Logger.log("Note Updated");
      Logger.log("Exit Now");
    } else {
      return;
    }
  } else {
    return;
  }
}