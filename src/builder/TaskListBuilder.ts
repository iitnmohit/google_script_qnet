export class TaskListBuilder {
    private etag?: string;
    private id?: string;
    // private kind?: string;
    private selfLink?: string;
    private title?: string;
    private updated?: string;

    private constructor () {
    }

    public build(): GoogleAppsScript.Tasks.Schema.TaskList {
        let _taskList = {} as GoogleAppsScript.Tasks.Schema.TaskList;
        _taskList.etag = this.etag;
        _taskList.id = this.id;
        _taskList.kind = "tasks#taskList";
        _taskList.selfLink = this.selfLink;
        _taskList.title = this.title;
        _taskList.updated = this.updated;

        return _taskList;
    }

    public static builder(): TaskListBuilder {
        return new TaskListBuilder();
    }

    public setTitle(title: string): TaskListBuilder {
        this.title = title;
        return this;
    }
}
