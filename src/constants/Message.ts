export class Msg {
    // TASK
    public static readonly TASK = {
        CREATE: {
            SERVER_ERROR: "Server error while creating task, Try after sometime.",
            COUNT: "Num of Task must be from 0 to 100."
        },
        UPDATE: {
            COUNT: "Num of Task must be from 0 to 10."
        },
        READ: {
            SERVER_ERROR: "Server error reading task list, Try after sometime.",
        },
        DELETE: {
            SERVER_ERROR: "Server error while deleting task list, Try after sometime.",
        },

        LIST: {
            CREATE: {
                SERVER_ERROR: "Server error while creating task list, Try after sometime."
            }
        }

    };

    public static readonly UI = {
        MSG_DELETE_ALERT: "Confirm to delete all task, This action cannot be undone."
    };

    public static readonly SHEET = {
        NOT_FOUND: "%s sheet not found.",
        INVALID_SHEET: "%s sheet is not valid.",
        MSG_INVALID_NAME_CELL_FORMAT: "Name is not valid."
    };
}

