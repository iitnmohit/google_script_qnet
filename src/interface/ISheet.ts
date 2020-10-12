export interface ISheet {
    NAME: string,
    INDEX: number,
    NUM_OF: {
        ROWS: number,
        COLUMNS: number,
    },
    FREEZE: {
        ROW: number,
        COLUMN: number,
    },
    COLUMN?: {},
    MIN_WIDTH?: {},
    MAX_WIDTH?: {},
    TABLES?: {};
}

export interface ITable {
    NAME: string,
    TOP_OFFESET: number,
    LEFT_OFFSET: number,
    APPEND: "row" | "col",
    WIDTH: number,
    HEIGHT: number,
    HEADDER: {
        TOP: {
            VALUES: Array<string>;
        },
        LEFT: {
            VALUES: Array<string>;
        };
    };
}

export interface IOverViewSheet extends ISheet {
    TABLES: {
        TABLE_OVERALL: ITable,
        TABLE_LIST_WISE: ITable;
    };
}

export interface ICitySheet extends ISheet {
    COLUMN: {
        LOCATION: string,
        COUNT: string,
    },
    MIN_WIDTH: {
        LOCATION: number,
        COUNT: number;
    },
    MAX_WIDTH: {
        LOCATION: number,
        COUNT: number;
    };
}

export interface ILovSheet extends ISheet {
    COLUMN: {
        LIST: string,
        STRIKE_THROUGH: string,
        CONNECT_UP: string,
        INFO: string,
        EDIFY: string,
        INVITE: string,
        PLAN: string,
        CLOSING: string,
        ZONE: string,
        CAST: string;
    },
    MIN_WIDTH: {
        LIST: number,
        STRIKE_THROUGH: number,
        CONNECT_UP: number,
        INFO: number,
        EDIFY: number,
        INVITE: number,
        PLAN: number,
        CLOSING: number,
        ZONE: number,
        CAST: number;
    },
    MAX_WIDTH: {
        LIST: number,
        STRIKE_THROUGH: number,
        CONNECT_UP: number,
        INFO: number,
        EDIFY: number,
        INVITE: number,
        PLAN: number,
        CLOSING: number,
        ZONE: number,
        CAST: number;
    };
}

export interface INameListSheet extends ISheet {
    COLUMN: {
        SELECT: string,
        SL_NO: string,
        NAME: string,
        LIST: string,
        LOCATION: string,
        ZONE: string,
        CONNECT_UP: string,
        INFO: string,
        EDIFY: string,
        INVITE: string,
        PLAN: string,
        PLAN_DATE: string,
        CLOSING: string,
        CAST: string,
        UPDATED_ON: string,
        LINK: string,
        ADD_LOG: string,
        DO: string,
    },
    MIN_WIDTH: {
        SELECT: number,
        SL_NO: number,
        NAME: number,
        LIST: number,
        LOCATION: number,
        ZONE: number,
        CONNECT_UP: number,
        INFO: number,
        EDIFY: number,
        INVITE: number,
        PLAN: number,
        PLAN_DATE: number,
        CLOSING: number,
        CAST: number,
        UPDATED_ON: number,
        LINK: number,
        ADD_LOG: number,
        DO: number;
    },
    MAX_WIDTH: {
        SELECT: number,
        SL_NO: number,
        NAME: number,
        LIST: number,
        LOCATION: number,
        ZONE: number,
        CONNECT_UP: number,
        INFO: number,
        EDIFY: number,
        INVITE: number,
        PLAN: number,
        PLAN_DATE: number,
        CLOSING: number,
        CAST: number,
        UPDATED_ON: number,
        LINK: number,
        ADD_LOG: number,
        DO: number;
    };
}