export class Msg {
    public static readonly SETUP_CONFIRMATION_MSG = "This will delete all the data and cannot be undone.\nAre you sure to proceed?";
    // TASK
    public static readonly TASK = {
        CREATE: {
            SERVER_ERROR: "Server error while creating task, Try after sometime.",
            COUNT: "Num of Task must be from 0 to 100."
        },
        UPDATE: {
            COUNT: "Num of Task must be from 0 to 50."
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
        COPY: {
            COUNT: "Num of Rows must be from 0 to 50."
        },
    };

    public static readonly CALENDER = {
        EVENT_CREATE: {
            COUNT: "Num of Event create must be from 0 to 5."
        },
    };

    public static readonly UI = {
        MSG_DELETE_ALERT: "Confirm to delete all task, This action cannot be undone."
    };

    public static readonly SHEET = {
        NOT_FOUND: "%s sheet not found.",
        INVALID_SHEET: "%s sheet is not valid.",
        INVALID_SHEET_COLUMN: "%s sheet is not valid. column '%s' is not found.",
        MSG_INVALID_NAME_CELL_FORMAT: "Name is not valid.",
        SERVER_ERROR: "Server error occured.",
        HEADDER_MORE_THAN_COLUMN: "Failed creating schema, for %s sheet, headder count is more than column count.",
        INVALID_ROW_COUNT: "Invalid Num of row value : %s",
        INVALID_COL_COUNT: "Invalid Num of col value : %s",
        INVALID_SHEET_NAME: "Sheet name is not valid!",
        NAME_NOT_PRESENT: "No name present at row %s",
        INVALID_COL_INDEX: "Column index is not valid.",
        COL_INDEX_POSITIVE: "Column Index must be positive.",
        INDEX_POSITIVE: "Index must be positive.",
        VALIDATION_DROP_DOWN__INVALID_INPUT: "Select %s value from dropdown."
    };
}

