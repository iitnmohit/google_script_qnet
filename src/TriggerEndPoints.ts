import { runSafely } from './Code';
import { TriggerService } from './service/TriggerService'

function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
  runSafely((): void => {
    new TriggerService().onOpen(event);
  });
}

function onEdit(event: GoogleAppsScript.Events.SheetsOnEdit) {
  runSafely((): void => {
    new TriggerService().onEdit(event);
  });
}
function onInstall(event: any) {
  onOpen(event);
}

