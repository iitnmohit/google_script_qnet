import { runSafely } from './Code';
import { UiService } from './service/UiService';

function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
  runSafely((): void => {
    new UiService().addBusinessMenu();
  });
}

function onInstall(event: any) {
  onOpen(event);
}

