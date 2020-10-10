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

    public static readonly LOG = {
        UPDATE: {
            COUNT: "Num of Log must be from 0 to 50."
        },
    };

    public static readonly UI = {
        MSG_DELETE_ALERT: "Confirm to delete all task, This action cannot be undone."
    };

    public static readonly SHEET = {
        NOT_FOUND: "%s sheet not found.",
        INVALID_SHEET: "%s sheet is not valid.",
        MSG_INVALID_NAME_CELL_FORMAT: "Name is not valid.",
        SERVER_ERROR: "Server error occured.",
        HEADDER_MORE_THAN_COLUMN: "Failed creating schema, for %s sheet, headder count is more than column count.",
        INVALI_ROW_COUNT: "Invalid Num of row value : %s",
        INVALI_COL_COUNT: "Invalid Num of col value : %s",
        INVALID_SHEET_NAME: "Sheet name is not valid!",
        NAME_NOT_PRESENT: "No name present at row %s",
    };
}

