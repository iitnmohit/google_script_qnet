import { CalenderEventBuilder } from "../builder/CalenderEventBuilder";
import { Constant } from "../constants/Constant";
import { Msg } from "../constants/Message";
import { Sheets } from "../constants/Sheets";
import { ICalenderEvent } from "../interface/ICalenderEvent";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { CalenderSheetSchema } from "../schemas/CalenderSheetSchema";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { DateUtil } from "../util/DateUtil";
import { ThemeUtil } from "../util/ThemeUtil";
import { BaseService } from "./BaseService";
import { UserPropertyService } from "./UserPropertyService";

export class CalenderService extends BaseService {
    private readonly calenderSchema: CalenderSheetSchema;
    private readonly nameListSchema: NameListSheetSchema;

    private readonly calenderCache: Map<string, GoogleAppsScript.Calendar.Calendar>;
    //calenderid -> date(dd/MMM/yyyy) -> list<events>
    private readonly eventCache: Map<string, Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>>;

    public constructor () {
        super();
        this.calenderSchema = CalenderSheetSchema
            .getValidCalenderSchema();
        this.nameListSchema = NameListSheetSchema
            .getValidNameListSchema();
        this.calenderCache = new Map<string, GoogleAppsScript.Calendar.Calendar>();
        this.eventCache = new Map<string, Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>>();
    }

    public deleteSelectedEvent(count: number = Constant.CALENDER_MAX_EVENT_DELETE): void {
        Preconditions.checkPositive(count);
        Preconditions.checkArgument(count <= Constant.CALENDER_MAX_EVENT_DELETE);

        this.operateOnSelectedRows(count, this.calenderSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: CalenderSheetSchema,
                row: number) => {
                let sheet = schema.SPREADSHEET;
                let notes = sheet.getRange(row, 1, 1, schema.NUM_OF_COLUMNS).getNotes();
                let eventId = notes[0][schema.getColIndexByName(Sheets.COLUMN_NAME.ALL_DAY) - 1];
                let calenderId = notes[0][schema.getColIndexByName(Sheets.COLUMN_NAME.CALENDER) - 1];
                let statTime = notes[0][schema.getColIndexByName(Sheets.COLUMN_NAME.START_TIME) - 1];
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

    public scheduleInvite(count: number = Constant.CALENDER_MAX_EVENT_CREATE): void {
        Preconditions.checkPositive(count, Msg.CALENDER.EVENT_CREATE.COUNT);
        Preconditions.checkArgument(count <= Constant.CALENDER_MAX_EVENT_CREATE, Msg.CALENDER.EVENT_CREATE.COUNT);

        let businessCalender = this.getOrCreateBusinessCalender();


        this.operateOnSelectedRows(count, this.nameListSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: NameListSheetSchema,
                row: number) => {
                let prospectNAme: string = schema.getCellRange(row, Sheets.COLUMN_NAME.NAME).getDisplayValue();
                Preconditions.checkNotBlank(prospectNAme, "No name present at Name Cell at row %s", row);

                let planDateValue: string = schema.getCellRange(row, Sheets.COLUMN_NAME.PLAN_DATE).getDisplayValue();
                Preconditions.checkNotBlank(planDateValue, "invalid plan date present at row %s", row);
                Preconditions.checkArgument(DateUtil.isValid(planDateValue), "invalid plan date present at row %s", row);

                let planTimeValue: string = schema.getCellRange(row, Sheets.COLUMN_NAME.INPUT).getDisplayValue();
                Preconditions.checkNotBlank(planTimeValue, "invalid plan time present at row %s", row);
                Preconditions.checkArgument(DateUtil.isValid(planDateValue + " " + planTimeValue), "invalid plan time present at row %s", row);

                let planStartDateTime: Date = DateUtil.parse(planDateValue + " " + planTimeValue);
                let planEndDateTime: Date = DateUtil.localDate();
                planEndDateTime.setTime(planStartDateTime.getTime() + (1000 * 60 * Constant.CALENDER_INVITE_EVENT_DURATION_IN_MINUTES));

                let emailIdValue: string = schema.getCellRange(row, Sheets.COLUMN_NAME.EMAIL).getDisplayValue();
                Preconditions.checkNotBlank(emailIdValue, "invalid email id present at row %s", row);

                let zoomMeetingLink: string = UserPropertyService.get(
                    Constant.CALENDER_ZOOM_MEETING_LINK_KEY,
                    Constant.CALENDER_ZOOM_MEETING_LINK_MSG);
                let inviteEventDescription: string = UserPropertyService.get(
                    Constant.CALENDER_INVITE_MEETING_DESCRIPTION_KEY,
                    Constant.CALENDER_INVITE_MEETING_DESCRIPTION_MSG).split("\\").join("\n");

                businessCalender.createEvent(
                    Utilities.formatString(Constant.CALENDER_INVITE_EVENT_TITLE, prospectNAme),
                    planStartDateTime, planEndDateTime, {
                    description: zoomMeetingLink + "\n\n" + inviteEventDescription,
                    location: zoomMeetingLink,
                    guests: emailIdValue,
                    sendInvites: true
                });

                schema.getCellRange(row, Sheets.COLUMN_NAME.INPUT).setValue("");
            });
    }

    private getOrCreateBusinessCalender(): GoogleAppsScript.Calendar.Calendar {
        let calendars = CalendarApp.getCalendarsByName(Constant.CALENDER_NAME);
        if (Predicates.IS_LIST_NOT_EMPTY.test(calendars)) {
            for (let calender of calendars) {
                if (calender.isOwnedByMe()) {
                    return calender;
                }
            }
        }
        return this.createCalender();
    }

    private createCalender(): GoogleAppsScript.Calendar.Calendar {
        return CalendarApp.createCalendar(Constant.CALENDER_NAME, {
            timeZone: Constant.CALENDER_TIMEZONE,
            color: Constant.CALENDER_COLOR
        });
    }

    public clearAllCheckbox(): void {
        this.calenderSchema.SPREADSHEET.getRange(2, this.calenderSchema.getColIndexByName(Sheets.COLUMN_NAME.DO),
            this.calenderSchema.NUM_OF_ROWS - 1, 1).uncheck();
    }

    private fetchAllEvents(startdays: number, endDays: number): Array<ICalenderEvent> {
        let allEvents = new Array<ICalenderEvent>();
        let calenders = CalendarApp.getAllCalendars();
        outer: for (let calender of calenders) {
            if (!calender.isOwnedByMe()) {
                continue outer;
            }
            for (let skipCalenderName of Constant.CALENDER_SKIP) {
                if (skipCalenderName === calender.getName()) {
                    continue outer;
                }
            }
            let _events: Array<GoogleAppsScript.Calendar.CalendarEvent> = [];
            if (startdays == endDays) {
                _events = calender.getEventsForDay(DateUtil.getBeginDayDate(startdays));
            } else {
                _events = calender.getEvents(DateUtil.getBeginDayDate(startdays),
                    DateUtil.getEndDayDate(endDays));
            }
            for (let _eventEach of _events) {
                allEvents.push(this.createNewMyEvent(_eventEach, calender));
            }
        }
        return allEvents;
    }

    private fillEventsToSheet(allEvents: ICalenderEvent[]): void {
        this.calenderSchema.insertRows(allEvents.length + this.calenderSchema.ISHEET.NUM_OF.ROWS - this.calenderSchema.NUM_OF_ROWS);
        let sortedEvent = allEvents.sort(this.eventArraySortComprator);
        let sheet = this.calenderSchema.SPREADSHEET;
        let row = 2;
        for (let _my_event of sortedEvent) {
            let rowArray = new Array<any>();
            rowArray.push(false);
            rowArray.push(_my_event.calenderName);
            rowArray.push(_my_event.title);
            rowArray.push(_my_event.description);
            rowArray.push(_my_event.isAllDayEvent);
            if (_my_event.isAllDayEvent === "NO") {
                rowArray.push(DateUtil.format(_my_event.startTime, true));
                rowArray.push(DateUtil.format(_my_event.endTime, true));
            } else {
                rowArray.push(DateUtil.format(_my_event.startTime));
                rowArray.push("");
            }

            sheet.getRange(row, 1, 1, this.calenderSchema.NUM_OF_COLUMNS)
                .setValues([rowArray])
                .setBackground(_my_event.color)
                .setFontColor(this.resolveFontColor(_my_event.color));
            sheet.getRange(row, this.calenderSchema.getColIndexByName(Sheets.COLUMN_NAME.CALENDER))
                .setBackground(_my_event.calenderColor)
                .setFontColor(this.resolveFontColor(_my_event.calenderColor))
                .setNote(_my_event.calenderId);
            sheet.getRange(row, this.calenderSchema.getColIndexByName(Sheets.COLUMN_NAME.ALL_DAY), 1, 2)
                .setNotes([[_my_event.id, DateUtil.format(_my_event.startTime)]]);
            row++;
        }
    }

    private createNewMyEvent(calEvent: GoogleAppsScript.Calendar.CalendarEvent, calender: GoogleAppsScript.Calendar.Calendar): ICalenderEvent {
        let eventBuilder = CalenderEventBuilder.builder();
        eventBuilder.setId(calEvent.getId())
            .setCalenderName(calender.getName())
            .setCalenderId(calender.getId())
            .setTitle(calEvent.getTitle())
            .setDescription(calEvent.getDescription())
            .setCalenderColor(calender.getColor());

        if (calEvent.isAllDayEvent()) {
            eventBuilder.setIsAllDayEvent("YES")
                .setStartTime(calEvent.getAllDayStartDate())
                .setEndTime(calEvent.getAllDayEndDate());
        } else {
            eventBuilder.setIsAllDayEvent("NO")
                .setStartTime(calEvent.getStartTime())
                .setEndTime(calEvent.getEndTime());
        }
        if (Predicates.IS_NOT_BLANK.test(calEvent.getColor())) {
            eventBuilder.setColor(this.resolveEventColor(calEvent.getColor()));
        } else {
            eventBuilder.setColor(calender.getColor());
        }
        return eventBuilder.build();
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
        this.calenderSchema.removeRow(2, this.calenderSchema.NUM_OF_ROWS - this.calenderSchema.ISHEET.NUM_OF.ROWS);
        this.calenderSchema.SPREADSHEET
            .getRange(2, 1, this.calenderSchema.NUM_OF_ROWS - 1, this.calenderSchema.NUM_OF_COLUMNS)
            .clearContent()
            .setBackground(ThemeUtil.getCurrentTheme().CALENDER_SHEET.FIRST_ROW_COLOR)
            .clearNote();
        this.calenderSchema.SPREADSHEET.setRowHeights(1, this.calenderSchema.NUM_OF_ROWS, ThemeUtil.getCurrentTheme().rowHeight);
        return this;
    }

    private eventArraySortComprator(left: ICalenderEvent,
        right: ICalenderEvent): number {
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
        if (!this.eventCache.has(calenderId)) {
            this.fillEventsInCache(calenderId, eventStartDate);
        }
        let eventDateMap = this.eventCache.get(calenderId);
        if (!eventDateMap.has(eventStartDate)) {
            this.fillEventsInCache(calenderId, eventStartDate);
        }
        let eventArray = eventDateMap.get(eventStartDate);
        let indexOfEvent = this.findIndexOfEvent(eventArray, eventId);
        if (indexOfEvent >= 0) {
            return eventArray.splice(indexOfEvent, 1)[0];
        }
        return null;
    }

    private fillEventsInCache(calenderId: string, eventStartDate: string): void {
        let events = this.getCalendarById(calenderId)
            .getEvents(DateUtil.getBeginWeekDate(DateUtil.parse(eventStartDate)), DateUtil.getEndWeekDate(DateUtil.parse(eventStartDate)));
        if (!this.eventCache.has(calenderId)) {
            this.eventCache.set(calenderId, new Map<string, Array<GoogleAppsScript.Calendar.CalendarEvent>>());
        }
        let dateEventMap = this.eventCache.get(calenderId);
        for (let _event of events) {
            let eventStartDate = DateUtil.format(_event.getStartTime());
            if (!dateEventMap.has(eventStartDate)) {
                dateEventMap.set(eventStartDate, new Array<GoogleAppsScript.Calendar.CalendarEvent>());
            }
            let eventArray = dateEventMap.get(eventStartDate);
            eventArray.push(_event);
        }
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