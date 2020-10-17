import { ICalenderSheet, ICitySheet, ILovSheet, INameListSheet, IOverViewSheet } from "../interface/ISheet";

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
            ROWS: 5000,
            COLUMNS: 18
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
            DO: "DO"
        },
        MIN_WIDTH: {
            SELECT: null,
            SL_NO: null,
            NAME: 275,
            LIST: 170,
            LOCATION: 155,
            ZONE: 120,
            CONNECT_UP: 145,
            INFO: 110,
            EDIFY: 145,
            INVITE: 140,
            PLAN: 175,
            PLAN_DATE: null,
            CLOSING: 200,
            CAST: 105,
            UPDATED_ON: null,
            LINK: 70,
            ADD_LOG: null,
            DO: null
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
            DO: 30
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
            ROWS: 1000,
            COLUMNS: 7
        },
        FREEZE: {
            ROW: Sheets.DEFAULT_FREEZE_ROW,
            COLUMN: Sheets.DEFAULT_FREEZE_COL
        },
        COLUMN: {
            DO: "DO",
            CALENDER: "CALENDER",
            TITLE: "TITLE",
            DESCRIPTION: "DESCRIPTION",
            ALLDAY: "ALL DAY",
            START_TIME: "START TIME",
            END_TIME: "END TIME",
        },
        MIN_WIDTH: {
            DO: null,
            CALENDER: 120,
            TITLE: 240,
            DESCRIPTION: 150,
            ALLDAY: null,
            START_TIME: 180,
            END_TIME: 180,
        },
        MAX_WIDTH: {
            DO: 30,
            CALENDER: null,
            TITLE: null,
            DESCRIPTION: null,
            ALLDAY: null,
            START_TIME: null,
            END_TIME: null,
        }
    } as ICalenderSheet;
}