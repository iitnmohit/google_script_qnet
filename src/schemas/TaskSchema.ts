export class TaskSchema {
    public static readonly TASK_LIST_NAME: string = "QNET";
    public static readonly MAX_TASK_UPDATE: number = 10;
    public static readonly MSG_INVALID_UPDATE_COUNT = "Num of Task must be from 0 to 10";
    public static readonly MAX_TASK_CREATE: number = 100;
    public static readonly MSG_INVALID_CREATE_COUNT = "Num of Task must be from 0 to 100";
    public static readonly MSG_ERROR_READ_TASK_LIST = "Server error reading task list, Try after sometime.";
    public static readonly MSG_ERROR_CREATE_TASK_LIST = "Server error while creating task list, Try after sometime.";
    public static readonly MSG_ERROR_DELETE_TASK_LIST = "Server error while deleting task list, Try after sometime.";
    public static readonly MSG_ERROR_CREATE_TASK = "Server error while creating task, Try after sometime.";
    public static readonly MSG_ERROR_DELETE_TASK = "Server error while deleting task, Try after sometime.";
   
}
