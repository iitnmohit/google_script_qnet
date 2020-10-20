import { ICalenderSheet, ICitySheet, IColumn, ILovSheet, INameListSheet, IOverViewSheet } from "../interface/ISheet";

export class Sheets {
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
        COLUMNS: [
            {
                NAME: "LOCATION",
                MIN_WIDTH: 200,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "COUNT",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn,
        ],
        COLUMN: {
            LOCATION: "LOCATION",
            COUNT: "COUNT"
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
        COLUMNS: [
            {
                NAME: "LIST",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "X",
                MIN_WIDTH: null,
                MAX_WIDTH: 30,
                INDEX: -1
            } as IColumn, {
                NAME: "CONNECT UP",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "INFO",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "EDIFY",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "INVITE",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "PLAN",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "CLOSING",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "ZONE",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "CAST",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn,
        ],
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
        }
    } as ILovSheet;

    // NameList Sheet
    public static readonly NAMELIST = {
        NAME: "NAME LIST",
        INDEX: 2,
        NUM_OF: {
            ROWS: 5000,
            COLUMNS: 18
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: 3
        },
        COLUMNS: [
            {
                NAME: "X",
                MIN_WIDTH: null,
                MAX_WIDTH: 30,
                INDEX: -1
            } as IColumn, {
                NAME: "Sl No",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "NAME",
                MIN_WIDTH: 275,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "LIST",
                MIN_WIDTH: 170,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "LOCATION",
                MIN_WIDTH: 155,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "ZONE",
                MIN_WIDTH: 120,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "CONNECT UP",
                MIN_WIDTH: 145,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "INFO",
                MIN_WIDTH: 110,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "EDIFY",
                MIN_WIDTH: 145,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "INVITE",
                MIN_WIDTH: 140,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "PLAN",
                MIN_WIDTH: 175,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "PLAN DATE",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "CLOSING",
                MIN_WIDTH: 200,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "CAST",
                MIN_WIDTH: 105,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "UPDATED ON",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "LINK",
                MIN_WIDTH: 70,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "ADD LOG",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "DO",
                MIN_WIDTH: null,
                MAX_WIDTH: 30,
                INDEX: -1
            } as IColumn
        ],
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
            DO: "DO"
        }
    } as INameListSheet;

    // overview sheet
    public static readonly OVERVIEW = {
        NAME: "OVERVIEW",
        INDEX: 1,
        NUM_OF: {
            ROWS: 9,
            COLUMNS: 10
        },
        FREEZE: {
            ROW: 0,
            COLUMN: 0
        },
        MIN_WIDTH: {
            COLA: null,
            COLB: 90,
            COLC: 95,
            COLD: null,
            COLE: 175,
            COLF: 70,
            COLG: 80,
            COLH: 90,
            COLI: 80,
            COLJ: null
        },
        MAX_WIDTH: {
            COLA: 30,
            COLB: null,
            COLC: null,
            COLD: 60,
            COLE: null,
            COLF: 70,
            COLG: null,
            COLH: null,
            COLI: null,
            COLJ: 20
        },
        TABLES: {
            TABLE_OVERALL: {
                NAME: "OVERALL",
                TOP_OFFESET: 2,
                LEFT_OFFSET: 1,
                APPEND: "col",
                WIDTH: 2,
                HEIGHT: 5,
                HEADDER: {
                    TOP: {
                        VALUES: null
                    },
                    LEFT: {
                        VALUES: [
                            "NAME",
                            "INFO",
                            "INVITE",
                            "PLAN",
                            "CLOSING"
                        ]
                    }
                }
            },
            TABLE_LIST_WISE: {
                NAME: "LIST_WISE",
                TOP_OFFESET: 1,
                LEFT_OFFSET: 1,
                APPEND: "row",
                WIDTH: 5,
                HEIGHT: 7,
                HEADDER: {
                    TOP: {
                        VALUES: [
                            "",
                            "",
                            "INFO",
                            "INVITE",
                            "PLAN"
                        ]
                    },
                    LEFT: {
                        VALUES: [
                            "",
                            "WORKING NOW",
                            "KEEP IN TOUCH",
                            "ONCE IN A WHILE",
                            "PENDING CLOSING",
                            "ON HOLD",
                            "NO CONTACT"
                        ]
                    }
                }
            }
        }
    } as IOverViewSheet;

    // calender sheet
    public static readonly CALENDER = {
        NAME: "CALENDER",
        INDEX: 5,
        NUM_OF: {
            ROWS: 20,
            COLUMNS: 7
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: Sheets.DEFAULT_FREEZE_COL
        },
        COLUMNS: [
            {
                NAME: "DO",
                MIN_WIDTH: null,
                MAX_WIDTH: 30,
                INDEX: -1
            } as IColumn, {
                NAME: "CALENDER",
                MIN_WIDTH: 120,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "TITLE",
                MIN_WIDTH: 240,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "DESCRIPTION",
                MIN_WIDTH: 150,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "ALL DAY",
                MIN_WIDTH: null,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "START TIME",
                MIN_WIDTH: 180,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn, {
                NAME: "END TIME",
                MIN_WIDTH: 180,
                MAX_WIDTH: null,
                INDEX: -1
            } as IColumn
        ],
        COLUMN: {
            DO: "DO",
            CALENDER: "CALENDER",
            TITLE: "TITLE",
            DESCRIPTION: "DESCRIPTION",
            ALLDAY: "ALL DAY",
            START_TIME: "START TIME",
            END_TIME: "END TIME",
        }
    } as ICalenderSheet;
}