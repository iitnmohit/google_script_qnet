export class DefaultSchema {
    // common
    private static readonly defaultNumofFreezeRow: number = 1;
    private static readonly defaultNumofFreezeCol: number = 0;

    public static readonly minRowHeight: number = 5;

    // City Sheet
    public static readonly CITY = {
        NAME: "CITY",
        INDEX: 4,
        NUM_OF: {
            ROWS: 200,
            COLUMNS: 2
        },
        FREEZE: {
            ROW: DefaultSchema.defaultNumofFreezeRow,
            COLUMN: DefaultSchema.defaultNumofFreezeCol
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
    };

    // Lov Sheet
    public static readonly LOV = {
        NAME: "Lists",
        INDEX: 3,
        NUM_OF: {
            ROWS: 100,
            COLUMNS: 9
        },
        FREEZE: {
            ROW: DefaultSchema.defaultNumofFreezeRow,
            COLUMN: DefaultSchema.defaultNumofFreezeCol
        },
        COLUMN: {
            LIST: "LIST",
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
            CONNECT_UP: null,
            INFO: null,
            EDIFY: null,
            INVITE: null,
            PLAN: null,
            CLOSING: null,
            ZONE: null,
            CAST: null
        }
    };

    // NameList Sheet
    public static readonly NAMELIST = {
        NAME: "NAME LIST",
        INDEX: 2,
        NUM_OF: {
            ROWS: 1000,
            COLUMNS: 19
        },
        FREEZE: {
            ROW: 3,
            COLUMN: DefaultSchema.defaultNumofFreezeCol
        },
        COLUMN: {
            SELECT: "X",
            SL_NO: "Sl No",
            NAME: "NAME",
            ADD_LOG: "ADD LOG",
            UPDATED: "UPDATED",
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
            TASK: "TASK"
        },
        MIN_WIDTH: {
            SELECT: null,
            SL_NO: null,
            NAME: 275,
            ADD_LOG: null,
            UPDATED: null,
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
            TASK: null
        },
        MAX_WIDTH: {
            SELECT: 30,
            SL_NO: null,
            NAME: null,
            ADD_LOG: null,
            UPDATED: 30,
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
            TASK: null
        }
    };








}