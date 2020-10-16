import { Calender } from "../constants/Calender";
import { MyCalenderEvent } from "../interface/MyCalenderEvent";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CalenderSheetSchema } from "../schemas/CalenderSheetSchema";
import { ThemeUtil } from "../util/ThemeUtil";
import { Util } from "../util/Util";
import { BaseService } from "./BaseService";

export class CalenderService extends BaseService {
    private readonly calenderSchema: CalenderSheetSchema;

    public constructor () {
        super();
        this.calenderSchema = CalenderSheetSchema
            .getValidCalenderSchema(SpreadsheetApp.getActiveSpreadsheet());
    }

    public deleteSelectedEvent(count: number = Calender.MAX_EVENT_DELETE): void {
        Preconditions.checkPositive(count);
        Preconditions.checkArgument(count <= Calender.MAX_EVENT_DELETE);

        this.operateOnSelectedRows(count, this.calenderSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: CalenderSheetSchema,
                row: number) => {
                let sheet = schema.getCurrentSheet();
                let eventId = sheet.getRange(row, schema.allDayColIndex).getNote();
                let calId = sheet.getRange(row, schema.calenderColIndex).getNote();
                Preconditions.checkNotBlank(eventId);
                CalendarApp.getCalendarById(calId).getEventById(eventId).deleteEvent();
            }, true);
    }

    public syncEvent(startdays: number, endDays): void {
        Preconditions.checkNotNull(startdays);
        Preconditions.checkNotNull(endDays);
        Preconditions.checkArgument(endDays >= startdays);

        this.clearSheet();
        let allEvents = this.fetchAllEvents(startdays, endDays);
        this.fillEventsToSheet(allEvents);
    }

    private fetchAllEvents(startdays: number, endDays: any): Array<MyCalenderEvent> {
        let allEvents = new Array<MyCalenderEvent>();
        let calenders = CalendarApp.getAllCalendars();
        for (let calender of calenders) {
            let _events = calender.getEvents(Util.getBeginDate(startdays),
                Util.getEodDate(endDays));
            for (let _eventEach of _events) {
                allEvents.push(this.createNewMyEvent(_eventEach, calender));
            }
        }
        return allEvents;
    }

    private fillEventsToSheet(allEvents: MyCalenderEvent[]): void {
        let sortedEvent = allEvents.sort(this.eventArraySortComprator);
        let sheet = this.calenderSchema.getCurrentSheet();
        let row = 2;
        for (let _my_event of sortedEvent) {
            let rowArray = new Array<any>();
            rowArray.push(false);
            rowArray.push(_my_event.calenderName);
            rowArray.push(_my_event.title);
            rowArray.push(_my_event.description);
            rowArray.push(_my_event.isAllDayEvent);
            rowArray.push(Util.formatDateTime(_my_event.startTime));
            rowArray.push(Util.formatDateTime(_my_event.endTime));
            sheet.getRange(row, 1, 1, this.calenderSchema.NUM_OF_COLUMNS)
                .setValues([rowArray])
                .setBackground(_my_event.color)
                .setFontColor(this.resolveFontColor(_my_event.color));
            sheet.getRange(row, this.calenderSchema.calenderColIndex)
                .setBackground(_my_event.calenderColor)
                .setFontColor(this.resolveFontColor(_my_event.calenderColor))
                .setNote(_my_event.calenderId);
            sheet.getRange(row, this.calenderSchema.allDayColIndex)
                .setNote(_my_event.id);
            row++;
        }
    }

    private createNewMyEvent(calEvent: GoogleAppsScript.Calendar.CalendarEvent, calender: GoogleAppsScript.Calendar.Calendar): MyCalenderEvent {
        let _myEvent = new MyCalenderEvent();
        _myEvent.id = calEvent.getId();
        _myEvent.calenderName = calender.getName();
        _myEvent.calenderId = calender.getId();
        _myEvent.title = calEvent.getTitle();
        _myEvent.description = calEvent.getDescription();
        _myEvent.calenderColor = calender.getColor();
        if (calEvent.isAllDayEvent()) {
            _myEvent.isAllDayEvent = "YES";
            _myEvent.startTime = calEvent.getAllDayStartDate();
            _myEvent.endTime = calEvent.getAllDayEndDate();
        } else {
            _myEvent.isAllDayEvent = "NO";
            _myEvent.startTime = calEvent.getStartTime();
            _myEvent.endTime = calEvent.getEndTime();
        }
        if (Predicates.IS_NOT_BLANK.test(calEvent.getColor())) {
            _myEvent.color = this.resolveEventColor(calEvent.getColor());
        } else {
            _myEvent.color = calender.getColor();
        }
        return _myEvent;
    }

    private resolveEventColor(color: string): string {
        switch (color) {
            case "1": return "#a4bdfc";
            case "2": return "#7AE7BF";
            case "3": return "#BDADFF";
            case "4": return "#FF887C";
            case "5": return "#FBD75B";
            case "6": return "#FFB878";
            case "7": return "#46D6DB";
            case "8": return "#E1E1E1";
            case "9": return "#5484ED";
            case "10": return "#51B749";
            case "11": return "#DC2127";
            default: return "#a4bdfc";
        }
    }

    private clearSheet(): CalenderService {
        this.calenderSchema.getCurrentSheet()
            .getRange(2, 1, this.calenderSchema.NUM_OF_ROWS - 1, this.calenderSchema.NUM_OF_COLUMNS)
            .clearContent()
            .setBackground(ThemeUtil.getCurrentTheme().calenderTableFirstRowColor)
            .clearNote();
        this.calenderSchema.getCurrentSheet().setRowHeights(1, this.calenderSchema.NUM_OF_ROWS, ThemeUtil.getCurrentTheme().rowHeight);
        return this;
    }

    private eventArraySortComprator(left: MyCalenderEvent,
        right: MyCalenderEvent): number {
        if (left.startTime.getTime() < right.startTime.getTime()) {
            return -1;
        } else {
            return 1;
        }
    }

    private resolveFontColor(colorHex: string): string {
        let hex = colorHex.replace(/#/, '');
        let r = parseInt(hex.substr(0, 2), 16);
        let g = parseInt(hex.substr(2, 2), 16);
        let b = parseInt(hex.substr(4, 2), 16);

        let luminance = ((0.299 * r)
            + (0.587 * g)
            + (0.114 * b)) / 255;
        if (luminance > 0.5) {
            return "#000000";
        } else {
            return "#ffffff";
        }
    }
}