import { ICitySheet, ILovSheet, INameListSheet, ISheet } from "../interface/ISheet";

export class Sheets {
    // public 
    public static readonly VALUE_DISPLAY_AFTER_LOG_ADDED: string = "Updated!";

    // common public
    public static readonly MIN_ROW_HEIGHT: number = 5;
    public static readonly DEFAULT_NUM_OF_ROWS: number = 1000;
    public static readonly DEFAULT_NUM_OF_COLS: number = 26;

    // common private
    private static readonly DEFAULT_FREEZE_ROW: number = 1;
    private static readonly DEFAULT_FREEZE_COL: number = 0;

    // City Sheet
    public static readonly CITY = {
        NAME: "CITY",
        INDEX: 4,
        NUM_OF: {
            ROWS: 200,
            COLUMNS: 2
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: Sheets.DEFAULT_FREEZE_COL
        },
        COLUMN: {
            LOCATION: "Location",
            COUNT: "Count"
        },
        MIN_WIDTH: {
            LOCATION: 200,
            COUNT: null
        },
        MAX_WIDTH: {
            LOCATION: null,
            COUNT: null
        }
    } as ICitySheet;

    // Lov Sheet
    public static readonly LOV = {
        NAME: "Lists",
        INDEX: 3,
        NUM_OF: {
            ROWS: 100,
            COLUMNS: 10
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: Sheets.DEFAULT_FREEZE_COL
        },
        COLUMN: {
            LIST: "LIST",
            STRIKE_THROUGH: "X",
            CONNECT_UP: "CONNECT UP",
            INFO: "INFO",
            EDIFY: "EDIFY",
            INVITE: "INVITE",
            PLAN: "PLAN",
            CLOSING: "CLOSING",
            ZONE: "ZONE",
            CAST: "CAST"
        },
        MIN_WIDTH: {
            LIST: null,
            STRIKE_THROUGH: null,
            CONNECT_UP: null,
            INFO: null,
            EDIFY: null,
            INVITE: null,
            PLAN: null,
            CLOSING: null,
            ZONE: null,
            CAST: null
        },
        MAX_WIDTH: {
            LIST: null,
            STRIKE_THROUGH: 30,
            CONNECT_UP: null,
            INFO: null,
            EDIFY: null,
            INVITE: null,
            PLAN: null,
            CLOSING: null,
            ZONE: null,
            CAST: null
        }
    } as ILovSheet;

    // NameList Sheet
    public static readonly NAMELIST = {
        NAME: "NAME LIST",
        INDEX: 2,
        NUM_OF: {
            ROWS: 1000,
            COLUMNS: 19
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: 3
        },
        COLUMN: {
            SELECT: "X",
            SL_NO: "Sl No",
            NAME: "NAME",
            LIST: "LIST",
            LOCATION: "LOCATION",
            ZONE: "ZONE",
            CONNECT_UP: "CONNECT UP",
            INFO: "INFO",
            EDIFY: "EDIFY",
            INVITE: "INVITE",
            PLAN: "PLAN",
            PLAN_DATE: "PLAN DATE",
            CLOSING: "CLOSING",
            CAST: "CAST",
            UPDATED_ON: "UPDATED ON",
            LINK: "LINK",
            ADD_LOG: "ADD LOG",
            UPDATED: "UPDATED",
            TASK: "TASK"
        },
        MIN_WIDTH: {
            SELECT: null,
            SL_NO: null,
            NAME: 275,
            LIST: 170,
            LOCATION: 155,
            ZONE: 100,
            CONNECT_UP: 130,
            INFO: 70,
            EDIFY: 130,
            INVITE: 130,
            PLAN: 170,
            PLAN_DATE: null,
            CLOSING: 200,
            CAST: 85,
            UPDATED_ON: null,
            LINK: 70,
            ADD_LOG: null,
            UPDATED: null,
            TASK: null
        },
        MAX_WIDTH: {
            SELECT: 30,
            SL_NO: null,
            NAME: null,
            LIST: null,
            LOCATION: null,
            ZONE: null,
            CONNECT_UP: null,
            INFO: null,
            EDIFY: null,
            INVITE: null,
            PLAN: null,
            PLAN_DATE: null,
            CLOSING: null,
            CAST: null,
            UPDATED_ON: null,
            LINK: null,
            ADD_LOG: null,
            UPDATED: 30,
            TASK: null
        }
    } as INameListSheet;

    // overview sheet
    public static readonly OVERVIEW = {
        NAME: "OVERVIEW",
        INDEX: 1,
        NUM_OF: {
            ROWS: 10,
            COLUMNS: 10
        },
        FREEZE: {
            ROW: 0,
            COLUMN: 0
        }
    } as ISheet;
}