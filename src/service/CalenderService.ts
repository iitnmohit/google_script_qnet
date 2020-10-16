import { Calender } from "../constants/Calender";
import { MyCalenderEvent } from "../interface/MyCalenderEvent";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CalenderSheetSchema } from "../schemas/CalenderSheetSchema";
import { DateUtil } from "../util/DateUtil";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseService } from "./BaseService";

export class CalenderService extends BaseService {
    private readonly calenderSchema: CalenderSheetSchema;
    private readonly calenderCache: Map<string, GoogleAppsScript.Calendar.Calendar>;
    //calenderid -> date(dd/MMM/yyyy) -> list<events>
    private readonly eventCache: Map<string, Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>>;

    public constructor () {
        super();
        this.calenderSchema = CalenderSheetSchema
            .getValidCalenderSchema(SpreadsheetApp.getActiveSpreadsheet());
        this.calenderCache = new Map<string, GoogleAppsScript.Calendar.Calendar>();
        this.eventCache = new Map<string, Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>>();
    }

    public deleteSelectedEvent(count: number = Calender.MAX_EVENT_DELETE): void {
        Preconditions.checkPositive(count);
        Preconditions.checkArgument(count <= Calender.MAX_EVENT_DELETE);

        this.operateOnSelectedRows(count, this.calenderSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: CalenderSheetSchema,
                row: number) => {
                let sheet = schema.getCurrentSheet();
                let notes = sheet.getRange(row, 1, 1, schema.NUM_OF_COLUMNS).getNotes();
                let eventId = notes[0][schema.allDayColIndex - 1];
                let calenderId = notes[0][schema.calenderColIndex - 1];
                let statTime = notes[0][schema.startTimeColIndex - 1];
                Preconditions.checkNotBlank(eventId, "Event id is not present.");
                let event = this.getEventById(eventId, calenderId, statTime);
                Preconditions.checkNotNull(event, "Date not synked or server error");
                event.deleteEvent();
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
            let _events = calender.getEvents(DateUtil.getBeginDate(startdays),
                DateUtil.getEodDate(endDays));
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
            if (_my_event.isAllDayEvent === "NO") {
                rowArray.push(DateUtil.formatDate(_my_event.startTime, true));
                rowArray.push(DateUtil.formatDate(_my_event.endTime, true));
            } else {
                rowArray.push(DateUtil.formatDate(_my_event.startTime));
                rowArray.push("");
            }

            sheet.getRange(row, 1, 1, this.calenderSchema.NUM_OF_COLUMNS)
                .setValues([rowArray])
                .setBackground(_my_event.color)
                .setFontColor(this.resolveFontColor(_my_event.color));
            sheet.getRange(row, this.calenderSchema.calenderColIndex)
                .setBackground(_my_event.calenderColor)
                .setFontColor(this.resolveFontColor(_my_event.calenderColor))
                .setNote(_my_event.calenderId);
            sheet.getRange(row, this.calenderSchema.allDayColIndex, 1, 2)
                .setNotes([[_my_event.id, DateUtil.formatDate(_my_event.startTime)]]);
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

    private getEventById(eventId: string, calenderId: string, eventStartDate: string): GoogleAppsScript.Calendar.CalendarEvent {
        Logger.log("event id : " + eventId);
        Logger.log("calender id : " + calenderId);
        Logger.log("start date : " + eventStartDate);
        if (!this.eventCache.has(calenderId)) {
            Logger.log("no cal id ");
            this.fillEventsInCache(calenderId, eventStartDate);
        }
        let eventDateMap = this.eventCache.get(calenderId);
        if (!eventDateMap.has(eventStartDate)) {
            Logger.log("no event date id ");
            this.fillEventsInCache(calenderId, eventStartDate);
        }
        Logger.log("eventDateMap : " + eventDateMap);
        let eventArray = eventDateMap.get(eventStartDate);
        Logger.log("eventArray : " + eventArray);
        let indexOfEvent = this.findIndexOfEvent(eventArray, eventId);
        Logger.log("indexOfEvent" + indexOfEvent);
        Logger.log("cache" + this.eventCache);
        if (indexOfEvent >= 0) {
            return eventArray.splice(indexOfEvent, 1)[0];
        }
        return null;
    }

    private fillEventsInCache(calenderId: string, eventStartDate: string): void {
        let events = this.getCalendarById(calenderId)
            .getEvents(DateUtil.getStartWeekTime(eventStartDate), DateUtil.getEndWeekTime(eventStartDate));
        Logger.log("events retrived : " + events + events.length);
        if (!this.eventCache.has(calenderId)) {
            Logger.log("adding cal id to map");
            this.eventCache.set(calenderId, new Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>());
        }
        let dateEventMap = this.eventCache.get(calenderId);
        Logger.log("_dateEventMap : " + dateEventMap);
        for (let _event of events) {
            let eventStartDate = DateUtil.formatDate(_event.getStartTime());
            Logger.log("__eventStartDate : " + eventStartDate);
            if (!dateEventMap.has(eventStartDate)) {
                Logger.log("adding event date to map");
                dateEventMap.set(eventStartDate, new Array<GoogleAppsScript.Calendar.CalendarEvent>());
            }
            let eventArray = dateEventMap.get(eventStartDate);
            Logger.log("__eventArray__" + eventArray);
            eventArray.push(_event);
        }
        Logger.log("testtt" + dateEventMap.size);
    }

    private getCalendarById(calenderId: string): GoogleAppsScript.Calendar.Calendar {
        if (!this.calenderCache.has(calenderId)) {
            this.calenderCache.set(calenderId, CalendarApp.getCalendarById(calenderId));
        }
        return this.calenderCache.get(calenderId);
    }

    private findIndexOfEvent(list: Array<GoogleAppsScript.Calendar.CalendarEvent>
        , eventId: string): number {
        if (Predicates.IS_LIST_EMPTY.test(list)) {
            return -1;
        }
        let _index = list.findIndex((eachEvent: GoogleAppsScript.Calendar.CalendarEvent) => {
            if (eachEvent.getId() === eventId) {
                return true;
            }
            return false;
        });
        return _index;
    }
}