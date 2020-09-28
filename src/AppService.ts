import { MenuService } from './MenuService'
import { CallLogService } from './CallLogService'

export class AppService {

    public onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
        let menuService = new MenuService();
        menuService.addBusinessMenu(event.source);
    }

    public onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
        let callLogService = new CallLogService();
        callLogService.addLog(event.range);
    }
}