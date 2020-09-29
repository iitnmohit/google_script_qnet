import { CallLogService } from "./CallLogService";
import { NameListSheetSchema } from "./NameListSheetSchema";

export class TaskService {
    public static readonly TASK_LIST_NAME: string = "QNET";

    private myTaskList: GoogleAppsScript.Tasks.Schema.TaskList;

    public updateSelectedLog(count?:number): void {
        let numOfTaskUpdated: number = 0;
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = new NameListSheetSchema(sheet);

        if (nameListSchema.taskColIndex < 1) {
            return;
        }

        for (let row = 2; row <= sheet.getLastRow(); row++) {
            if (count != null && count == numOfTaskUpdated) {
                break;
            }

            let checkBoxRange = sheet.getRange(row, nameListSchema.taskColIndex);
            //skip if not checked
            if (!checkBoxRange.isChecked()) {
                continue;
            }

            // break if no name
            let nameCell = sheet.getRange(row, nameListSchema.nameColIndex);
            if (nameCell.isBlank()) {
                break;
            }

            // break if no task id
            let taskId = checkBoxRange.getNote().trim();
            if (taskId.length < 1) {
                continue;
            }

            // get task
            var _task = this.getTaskById(taskId);
            if (_task == null) {
                continue;
            }

            //update task
            var callLog = CallLogService.formatLog(_task.notes);
            nameCell.setNote(callLog);

            //delete task
            this.deleteTaskById(_task.id);

            //at last uncheck
            checkBoxRange.clearNote();
            checkBoxRange.uncheck();

            numOfTaskUpdated++;
        }
    }

    public deleteAllTasks(): void {
        Tasks.Tasklists.remove(this.getTaskList().id);
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = new NameListSheetSchema(sheet);

        if (nameListSchema.taskColIndex < 1) {
            return;
        }
        sheet.getRange(2, nameListSchema.taskColIndex, sheet.getMaxRows() - 1, 1).clearNote()
    }

    public clearAllCheckbox(): void {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = new NameListSheetSchema(sheet);

        if (nameListSchema.taskColIndex < 1) {
            return;
        }
        sheet.getRange(2, nameListSchema.taskColIndex, sheet.getMaxRows() - 1, 1).uncheck()
    }

    public addAllTask(count?: number): void {
        let numOfTaskAdded: number = 0;
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NameListSheetSchema.SHEET_NAME);
        if (null == sheet) {
            return;
        }
        let nameListSchema = new NameListSheetSchema(sheet);

        if (nameListSchema.taskColIndex < 1) {
            return;
        }

        for (let row = 2; row <= sheet.getLastRow(); row++) {
            if (count != null && count == numOfTaskAdded) {
                break;
            }

            let checkBoxRange = sheet.getRange(row, nameListSchema.taskColIndex);
            //skip if not checked
            if (!checkBoxRange.isChecked()) {
                continue;
            }

            // break if no name
            let nameCell = sheet.getRange(row, nameListSchema.nameColIndex);
            if (nameCell.isBlank()) {
                break;
            }

            //add one task
            let taskAdded = this.addNewTask(nameListSchema, sheet, row);
            checkBoxRange.setNote(taskAdded.id);

            numOfTaskAdded++;
            //at last uncheck
            checkBoxRange.uncheck();
        }
        return;
    }

    private deleteTaskById(taskId: string): void {
        Tasks.Tasks.remove(this.getTaskList().id, taskId);
    }
    private getTaskById(taskId: string): GoogleAppsScript.Tasks.Schema.Task {
        return Tasks.Tasks.get(this.getTaskList().id, taskId);
    }

    private addNewTask(nameListSchema: NameListSheetSchema, sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number): GoogleAppsScript.Tasks.Schema.Task {
        let nameCell = sheet.getRange(row, nameListSchema.nameColIndex);
        let taskTitle = nameCell.getDisplayValue().trim();
        if (nameListSchema.slNoColIndex > 0) {
            taskTitle = taskTitle + " ("
                + sheet.getRange(row, nameListSchema.slNoColIndex).getDisplayValue()
                + ")";
        }
        let newTask = TaskBuilder.builder()
            .setTitle(taskTitle)
            .setNotes(CallLogService.formatLog(nameCell.getNote()))
            .build();

        return Tasks.Tasks.insert(newTask, this.getTaskList().id);
    }

    private getTaskList(): GoogleAppsScript.Tasks.Schema.TaskList {
        if (this.myTaskList != null) {
            return this.myTaskList;
        }

        let taskLists = Tasks.Tasklists.list();
        if (taskLists.items) {
            for (let i = 0; i < taskLists.items.length; i++) {
                var taskList = taskLists.items[i];
                if (taskList.title === TaskService.TASK_LIST_NAME) {
                    this.myTaskList = taskList;
                    break;
                }
            }
        }

        if (this.myTaskList == null) {
            let newTaskList = TaskListBuilder.builder()
                .setTitle(TaskService.TASK_LIST_NAME)
                .build();
            this.myTaskList = Tasks.Tasklists.insert(newTaskList);
        }

        return this.myTaskList;
    }
}

class TaskListBuilder {
    private etag?: string;
    private id?: string;
    // private kind?: string;
    private selfLink?: string;
    private title?: string;
    private updated?: string;

    private constructor() {
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

class TaskBuilder {
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