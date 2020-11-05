import { ICalenderEvent } from "../interface/ICalenderEvent";

export class CalenderEventBuilder {
    public id: string;
    public calenderName: string;
    public calenderId: string;
    public title: string;
    public description: string;
    public startTime: GoogleAppsScript.Base.Date;
    public endTime: GoogleAppsScript.Base.Date;
    public isAllDayEvent: string;
    public calenderColor: string;
    public color: string;

    private constructor () {
    }

    public build(): ICalenderEvent {
        let _myEvent = {} as ICalenderEvent;
        _myEvent.id = this.id;
        _myEvent.calenderName = this.calenderId;
        _myEvent.calenderId = this.calenderId;
        _myEvent.title = this.title;
        _myEvent.description = this.description;
        _myEvent.startTime = this.startTime;
        _myEvent.endTime = this.endTime;
        _myEvent.isAllDayEvent = this.isAllDayEvent;
        _myEvent.calenderColor = this.calenderColor;
        _myEvent.color = this.color;
        return _myEvent;
    }

    public static builder(): CalenderEventBuilder {
        return new CalenderEventBuilder();
    }

    public setId(id: string): CalenderEventBuilder {
        this.id = id;
        return this;
    }

    public setCalenderName(calenderName: string): CalenderEventBuilder {
        this.calenderName = calenderName;
        return this;
    }

    public setCalenderId(calenderId: string): CalenderEventBuilder {
        this.calenderId = calenderId;
        return this;
    }

    public setTitle(title: string): CalenderEventBuilder {
        this.title = title;
        return this;
    }

    public setDescription(description: string): CalenderEventBuilder {
        this.description = description;
        return this;
    }

    public setStartTime(startTime: GoogleAppsScript.Base.Date): CalenderEventBuilder {
        this.startTime = startTime;
        return this;
    }

    public setEndTime(endTime: GoogleAppsScript.Base.Date): CalenderEventBuilder {
        this.endTime = endTime;
        return this;
    }

    public setIsAllDayEvent(isAllDayEvent: string): CalenderEventBuilder {
        this.isAllDayEvent = isAllDayEvent;
        return this;
    }

    public setCalenderColor(calenderColor: string): CalenderEventBuilder {
        this.calenderColor = calenderColor;
        return this;
    }

    public setColor(color: string): CalenderEventBuilder {
        this.color = color;
        return this;
    }
}