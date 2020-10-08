export class TaskMessage {
    public static readonly TASK_LIST_NAME: string = "QNET";
    public static readonly MAX_TASK_UPDATE: number = 10;
    public static readonly MAX_TASK_CREATE: number = 100;

    public static readonly MSG_INVALID_CREATE_COUNT: string = "Num of Task must be from 0 to 100";
    public static readonly MSG_ERROR_CREATE_TASK_LIST: string = "Server error while creating task list, Try after sometime.";
    public static readonly MSG_ERROR_CREATE_TASK: string = "Server error while creating task, Try after sometime.";

    public static readonly MSG_INVALID_UPDATE_COUNT: string = "Num of Task must be from 0 to 10";

    public static readonly MSG_ERROR_READ_TASK_LIST: string = "Server error reading task list, Try after sometime.";

    public static readonly MSG_ERROR_DELETE_TASK_LIST: string = "Server error while deleting task list, Try after sometime.";
    public static readonly MSG_ERROR_DELETE_TASK: string = "Server error while deleting task, Try after sometime.";
    public static readonly MSG_DELETE_ALERT: string = "Confirm to delete all task, This action cannot be undone.";
}

export class SheetMessage {
    public static readonly SHEET_NOT_FOUND: string = "%s sheet not found.";
    public static readonly INVALID_SHEET: string = "%s sheet is not valid.";
}
