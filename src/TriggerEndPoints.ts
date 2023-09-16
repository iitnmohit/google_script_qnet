declare const exports: typeof import('./Code');
import { UiService } from './service/UiService';
import { Constant } from "./constants/Constant";
import { UserPropertyService } from './service/UserPropertyService';

function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
  exports.runSafely((): void => {
    new UiService().addBusinessMenu();
    UserPropertyService.remove(Constant.LOG_UPDATE_DATE_KEY);
  });
}

function onInstall(event: any) {
  onOpen(event);
}

