import { TaskBuilder } from "../builder/TaskBuilder";
import { TaskListBuilder } from "../builder/TaskListBuilder";
import { Msg } from "../constants/Message";
import { Task } from "../constants/Task";
import { ServerException } from "../library/Exceptions";
import { Preconditions } from "../library/Preconditions";
import { Predicates } from "../library/Predicates";
import { NameListSheetSchema } from "../schemas/NameListSheetSchema";
import { DateUtil } from "../util/DateUtil";
import { Util } from "../util/Util";
import { BaseService } from "./BaseService";

export class TaskService extends BaseService {
    private readonly nameListSchema: NameListSheetSchema;
    private myTaskList: GoogleAppsScript.Tasks.Schema.TaskList;

    public constructor () {
        super();
        this.nameListSchema = NameListSheetSchema
            .getValidNameListSchema(SpreadsheetApp.getActiveSpreadsheet());
    }

    public updateSelectedLog(count: number = Task.MAX_TASK_UPDATE): void {
        Preconditions.checkPositive(count, Msg.TASK.UPDATE.COUNT);
        Preconditions.checkArgument(count <= Task.MAX_TASK_UPDATE, Msg.TASK.UPDATE.COUNT);

        this.operateOnSelectedRows(count, this.nameListSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: NameListSheetSchema,
                row: number) => {
                let nameSheet = schema.SPREADSHEET;
                // get task
                let taskId = checkBoxCell.getNote().trim();
                let _task = this.getTaskById(taskId);
                if (Predicates.IS_NOT_NULL.test(_task)) {
                    //update task
                    let logDate: string = "today";
                    if (Predicates.IS_NOT_NULL.test(_task.completed)) {
                        logDate = _task.completed;
                    } else if (Predicates.IS_NOT_NULL.test(_task.updated)) {
                        logDate = _task.updated;
                    }
                    let callLog = Util.formatUpdateLog(_task.notes, logDate);
                    nameSheet.getRange(row, this.nameListSchema.nameColIndex).setNote(callLog);
                    nameSheet.getRange(row, this.nameListSchema.updateOnColIndex).setValue(DateUtil.format());

                    //delete task
                    this.deleteTaskById(_task.id);

                    //at last uncheck
                    checkBoxCell.clearNote();
                }
            });
    }

    public deleteAllTasks(): void {
        if (Predicates.IS_NOT_NULL.test(this.getTaskList(false))) {
            try {
                Tasks.Tasklists.remove(this.getTaskList().id);
                this.nameListSchema.SPREADSHEET.getRange(2, this.nameListSchema.doColIndex, this.nameListSchema.NUM_OF_ROWS - 1, 1).clearNote();
            } catch (error) {
                throw new ServerException(Msg.TASK.DELETE.SERVER_ERROR);
            }
        }
    }

    public clearAllCheckbox(): void {
        this.nameListSchema.SPREADSHEET.getRange(2, this.nameListSchema.doColIndex, this.nameListSchema.NUM_OF_ROWS - 1, 1).uncheck();
    }

    public addAllTask(count: number = Task.MAX_TASK_CREATE): void {
        Preconditions.checkPositive(count, Msg.TASK.CREATE.COUNT);
        Preconditions.checkArgument(count <= Task.MAX_TASK_CREATE, Msg.TASK.CREATE.COUNT);

        this.operateOnSelectedRows(count, this.nameListSchema,
            (checkBoxCell: GoogleAppsScript.Spreadsheet.Range,
                schema: NameListSheetSchema,
                row: number) => {
                let taskId = checkBoxCell.getNote().trim();
                if (Predicates.IS_BLANK.test(taskId)) {
                    //add one task
                    let taskAdded = this.addNewTask(schema, row);
                    checkBoxCell.setNote(taskAdded.id);
                }
            });
    }

    private deleteTaskById(taskId: string): void {
        if (Predicates.IS_BLANK.test(taskId)) {
            return;
        }
        try {
            Tasks.Tasks.remove(this.getTaskList().id, taskId);
        } catch (error) {
            throw new ServerException(error);
        }
    }

    private getTaskById(taskId: string): GoogleAppsScript.Tasks.Schema.Task {
        if (Predicates.IS_BLANK.test(taskId)) {
            return null;
        }
        try {
            return Tasks.Tasks.get(this.getTaskList().id, taskId);
        } catch (error: unknown) {
        }
        return null;
    }

    private addNewTask(schema: NameListSheetSchema, row: number): GoogleAppsScript.Tasks.Schema.Task {
        let sheet = schema.SPREADSHEET;
        // break if no name
        let nameCell = sheet.getRange(row, schema.nameColIndex);
        Preconditions.checkFalse(nameCell.isBlank(), Msg.SHEET.NAME_NOT_PRESENT, row);

        let nameCellValue = nameCell.getDisplayValue();
        let taskTitle: string = nameCellValue.trim()
            + " ("
            + sheet.getRange(row, this.nameListSchema.slNoColIndex).getDisplayValue()
            + ")";
        let newTask = TaskBuilder.builder()
            .setTitle(taskTitle)
            .setNotes(Util.formatUpdateLog(nameCell.getNote()))
            .build();
        try {
            return Tasks.Tasks.insert(newTask, this.getTaskList().id);
        } catch (error) {
            throw new ServerException(Msg.TASK.CREATE.SERVER_ERROR);
        }
    }

    private getTaskList(create: boolean = true): GoogleAppsScript.Tasks.Schema.TaskList {
        Preconditions.checkNotNull(create);
        if (Predicates.IS_NOT_NULL.test(this.myTaskList)) {
            return this.myTaskList;
        }

        try {
            let taskLists = Tasks.Tasklists.list();
            if (taskLists.items) {
                for (let taskList of taskLists.items) {
                    if (taskList.title === Task.LIST_NAME) {
                        this.myTaskList = taskList;
                        break;
                    }
                }
            }
        } catch (error) {
            throw new ServerException(Msg.TASK.READ.SERVER_ERROR);
        }

        if (this.myTaskList == null && create) {
            let newTaskList = TaskListBuilder.builder()
                .setTitle(Task.LIST_NAME)
                .build();
            try {
                this.myTaskList = Tasks.Tasklists.insert(newTaskList);
            } catch (error) {
                throw new ServerException(Msg.TASK.LIST.CREATE.SERVER_ERROR);
            }
        }
        return this.myTaskList;
    }
}


