import { CallLogService } from "./CallLogService";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { TaskSchema } from "../schemas/TaskSchema";
import { TaskBuilder } from "../model/TaskBuilder";
import { TaskListBuilder } from "../model/TaskListBuilder";
import { Util } from "./Util";

export class TaskService {
    private readonly nameListSheet: GoogleAppsScript.Spreadsheet.Sheet;
    private myTaskList: GoogleAppsScript.Tasks.Schema.TaskList;

    public constructor() {
        this.nameListSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(NameListSheetSchema.SHEET_NAME);
    }

    public updateSelectedLog(count: number = TaskSchema.MAX_TASK_UPDATE): void {
        if (count < 0 || count > TaskSchema.MAX_TASK_UPDATE) {
            throw TaskSchema.MSG_INVALID_UPDATE_COUNT;
        }

        let nameListSchema = NameListSheetSchema.getValidSchema(this.nameListSheet);

        let numOfTaskUpdated = 0;
        let taskColValues = this.nameListSheet
            .getRange(2, nameListSchema.taskColIndex, this.nameListSheet.getLastRow() - 1, 1)
            .getValues();
        for (let i = 0; i < taskColValues.length; i++) {
            if (taskColValues[i][0] === false) {
                continue;
            }

            let row = i + 2;
            let checkBoxCell = this.nameListSheet.getRange(row, nameListSchema.taskColIndex);
            //skip if not checked
            if (!checkBoxCell.isChecked()) {
                continue;
            }

            // get task
            let taskId = checkBoxCell.getNote().trim();
            let _task = this.getTaskById(taskId);
            if (_task == null) {
                continue;
            }

            //update task
            let todayDate: string = "today";
            if (_task.completed != null) {
                todayDate = _task.completed;
            } else if (_task.updated != null) {
                todayDate = _task.updated;
            }
            let callLog = Util.formatUpdateLog(_task.notes, todayDate);
            this.nameListSheet.getRange(row, nameListSchema.nameColIndex).setNote(callLog);
            this.nameListSheet.getRange(row, nameListSchema.updateOnColIndex).setValue(new Date());
            this.nameListSheet.getRange(row, nameListSchema.updateColIndex).check();

            //delete task
            this.deleteTaskById(_task.id);

            //at last uncheck
            checkBoxCell.clearNote();
            checkBoxCell.uncheck();

            numOfTaskUpdated++;
            if (count != null && count == numOfTaskUpdated) {
                break;
            }
        }
    }

    public deleteAllTasks(): void {
        let nameListSchema = NameListSheetSchema.getValidSchema(this.nameListSheet);
        if (null != this.getTaskList(false)) {
            try {
                Tasks.Tasklists.remove(this.getTaskList().id);
                this.nameListSheet.getRange(2, nameListSchema.taskColIndex, this.nameListSheet.getMaxRows() - 1, 1).clearNote()
            } catch (error) {
                Logger.log(error);
                throw TaskSchema.MSG_ERROR_DELETE_TASK_LIST
            }
        }
    }

    public clearAllCheckbox(): void {
        let nameListSchema = NameListSheetSchema.getValidSchema(this.nameListSheet);
        this.nameListSheet.getRange(2, nameListSchema.taskColIndex, this.nameListSheet.getMaxRows() - 1, 1).uncheck()
    }

    public addAllTask(count: number = TaskSchema.MAX_TASK_CREATE): void {
        if (count < 0 || count > TaskSchema.MAX_TASK_CREATE) {
            throw TaskSchema.MSG_INVALID_CREATE_COUNT;
        }

        let nameListSchema = NameListSheetSchema.getValidSchema(this.nameListSheet);

        let numOfTaskAdded: number = 0;
        let taskColValues = this.nameListSheet
            .getRange(2, nameListSchema.taskColIndex, this.nameListSheet.getLastRow() - 1, 1)
            .getValues();

        for (let i = 0; i < taskColValues.length; i++) {
            if (taskColValues[i][0] === false) {
                continue;
            }
            let row = i + 2;

            let checkBoxRange = this.nameListSheet.getRange(row, nameListSchema.taskColIndex);
            //skip if not checked
            if (!checkBoxRange.isChecked()) {
                continue;
            }

            //add one task
            let taskAdded = this.addNewTask(nameListSchema, row);
            checkBoxRange.setNote(taskAdded.id);

            numOfTaskAdded++;

            //at last uncheck
            checkBoxRange.uncheck();

            if (count != null && count == numOfTaskAdded) {
                break;
            }
        }
    }

    private deleteTaskById(taskId: string): void {
        if (null == taskId || taskId.length < 1) {
            return;
        }
        try {
            Tasks.Tasks.remove(this.getTaskList().id, taskId);
        } catch (error: unknown) {
            if (typeof error === "string") {
                Logger.log("Error");
            }
            if (error instanceof Error) {
                Logger.log("Error" + error.message + error.stack);
            }
            throw TaskSchema.MSG_ERROR_DELETE_TASK;
        }
    }

    private getTaskById(taskId: string): GoogleAppsScript.Tasks.Schema.Task {
        if (null == taskId || taskId.length < 1) {
            return null;
        }

        try {
            return Tasks.Tasks.get(this.getTaskList().id, taskId);
        } catch (error: unknown) {
            if (typeof error === "string") {
                Logger.log(error);
            }
            if (error instanceof Error) {
                Logger.log("Error" + error.message + error.stack);
            }
        }

        return null;
    }

    private addNewTask(nameListSchema: NameListSheetSchema, row: number): GoogleAppsScript.Tasks.Schema.Task {
        // break if no name
        let nameCell = this.nameListSheet.getRange(row, nameListSchema.nameColIndex);
        if (nameCell.isBlank()) {
            throw `No name present at row ${row}`;
        }

        let nameCellValue = nameCell.getValue();
        if (typeof nameCellValue !== "string") {
            throw NameListSheetSchema.MSG_INVALID_NAME_CELL_FORMAT;
        }

        let taskTitle: string = nameCellValue.trim()
            + " ("
            + this.nameListSheet.getRange(row, nameListSchema.slNoColIndex).getDisplayValue()
            + ")";
        let newTask = TaskBuilder.builder()
            .setTitle(taskTitle)
            .setNotes(Util.formatUpdateLog(nameCell.getNote()))
            .build();
        try {
            return Tasks.Tasks.insert(newTask, this.getTaskList().id);
        } catch (error) {
            Logger.log(error);
            throw TaskSchema.MSG_ERROR_CREATE_TASK;
        }
    }

    private getTaskList(create: boolean = true): GoogleAppsScript.Tasks.Schema.TaskList {
        if (this.myTaskList != null) {
            return this.myTaskList;
        }

        try {
            let taskLists = Tasks.Tasklists.list();
            if (taskLists.items) {
                for (let taskList of taskLists.items) {
                    if (taskList.title === TaskSchema.TASK_LIST_NAME) {
                        this.myTaskList = taskList;
                        break;
                    }
                }
            }
        } catch (error) {
            Logger.log(error);
            throw TaskSchema.MSG_ERROR_READ_TASK_LIST
        }

        if (this.myTaskList == null && create) {
            let newTaskList = TaskListBuilder.builder()
                .setTitle(TaskSchema.TASK_LIST_NAME)
                .build();
            try {
                this.myTaskList = Tasks.Tasklists.insert(newTaskList);
            } catch (error) {
                Logger.log(error);
                throw TaskSchema.MSG_ERROR_CREATE_TASK_LIST
            }
        }
        return this.myTaskList;
    }
}


