import { runSafelyWithParam } from './Code';
import { TriggerService } from './service/TriggerService'

function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
  runSafelyWithParam(event, new TriggerService().onOpen);
}

function onEdit(event: GoogleAppsScript.Events.SheetsOnEdit) {
  runSafelyWithParam(event, new TriggerService().onEdit);
}
function onInstall(event: any) {
  onOpen(event);
}

