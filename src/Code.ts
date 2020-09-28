import { AppService } from './AppService'

function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen) {
  let appLoad = new AppService();
  appLoad.onOpen(event);
}

function onEdit(event:GoogleAppsScript.Events.SheetsOnEdit) {
  let appLoad = new AppService();
  appLoad.onEdit(event);
}