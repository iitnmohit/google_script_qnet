import { Index } from "../library/Index";

export interface IColumn {
    NAME: string,
    MIN_WIDTH: number,
    MAX_WIDTH: number,
    INDEX: number;
}

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
    COLUMNS?: Array<IColumn>,
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
    },
    INDEX: Index;
}

export interface IOverViewSheet extends ISheet {
    MIN_WIDTH: {
        COLA: number,
        COLB: number,
        COLC: number,
        COLD: number,
        COLE: number,
        COLF: number,
        COLG: number,
        COLH: number,
        COLI: number,
        COLJ: number;
    },
    MAX_WIDTH: {
        COLA: number,
        COLB: number,
        COLC: number,
        COLD: number,
        COLE: number,
        COLF: number,
        COLG: number,
        COLH: number,
        COLI: number,
        COLJ: number;
    },
    TABLES: {
        TABLE_OVERALL: ITable,
        TABLE_LIST_WISE: ITable;
    };
}