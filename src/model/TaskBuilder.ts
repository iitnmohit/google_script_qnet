export class TaskBuilder {
    private completed?: string;
    // private deleted?: boolean;
    private due?: string;
    private etag?: string;
    // private hidden?: boolean;
    private id?: string;
    // private kind?: string;
    private links?: GoogleAppsScript.Tasks.Schema.TaskLinks[];
    private notes?: string;
    private parent?: string;
    private position?: string;
    private selfLink?: string;
    // private status?: string;
    private title?: string;
    private updated?: string;

    private constructor() {
    }

    public build(): GoogleAppsScript.Tasks.Schema.Task {
        let _task = {} as GoogleAppsScript.Tasks.Schema.Task;
        _task.completed = this.completed;
        _task.deleted = false;
        _task.due = this.due;
        _task.etag = this.etag;
        _task.hidden = false;
        _task.id = this.id;
        _task.kind = "tasks#task";
        _task.links = this.links;
        _task.notes = this.notes;
        _task.parent = this.parent;
        _task.position = this.position;
        _task.selfLink = this.selfLink;
        _task.status = "needsAction";
        _task.title = this.title;
        _task.updated = this.updated;

        return _task;
    }

    public static builder(): TaskBuilder {
        return new TaskBuilder();
    }

    public setTitle(title: string): TaskBuilder {
        this.title = title;
        return this;
    }

    public setNotes(notes: string): TaskBuilder {
        this.notes = notes;
        return this;
    }
}