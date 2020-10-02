import { NameListSheetSchema } from '../schemas/NameListSheetSchema';
import { CallLogService } from './CallLogService';
import { UiService } from './UiService';

export class TriggerService {
    public onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
        new UiService().addBusinessMenu(event.source);
    }

    public onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
        if (event.range.getSheet().getName() === NameListSheetSchema.SHEET_NAME) {
            new CallLogService().addLog(event.range);
        }
    }
}