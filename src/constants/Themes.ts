import { ITheme } from "../interface/ITheme";

export class Themes {
    public static readonly DEFAULT = {
        fontFamily: "VERDANA",
        fontVerticalAlignment: "middle",
        bandingTheme: SpreadsheetApp.BandingTheme.GREEN,
        textColor: "#2a5e90",
        headderFontSize: 10,
        headderFontWeight: "bold",
        headderFontAlignment: "center",
        borderColor: "#000000",
        rowHeight: 25,
        colWidthOffset: 14,

        CITY_SHEET: {
            HEADDER_FONT_COLOR: "#ffffff",
            HEADDER_COLOR: "#274e13",
            FIRST_ROW_COLOR: "#ffffff",
            SECOND_ROW_COLOR: "#ffffff",
        },

        LOV_SHEET: {
            HEADDER_FONT_COLOR: "#990000",
            HEADDER_COLOR: "#f4cccc",
            FIRST_ROW_COLOR: "#ffffff",
            SECOND_ROW_COLOR: "#ffffff",
        },

        NAME_LIST_SHEET: {
            HEADDER_FONT_COLOR: "#ffffff",
            HEADDER_COLOR: "#6aa84f",
            FIRST_ROW_COLOR: "#ffffff",
            SECOND_ROW_COLOR: "#ffffff",
        },

        OVERVIEW_SHEET: {
            HEADDER_FONT_COLOR: "#351c75",
            HEADDER_COLOR: "#b4a7d6",
            FIRST_ROW_COLOR: "#fff2cc",
            SECOND_ROW_COLOR: "#e8e7fc",
        },
        CALENDER_SHEET: {
            HEADDER_FONT_COLOR: "#f3f3f3",
            HEADDER_COLOR: "#5791ec",
            FIRST_ROW_COLOR: "#ffffff",
            SECOND_ROW_COLOR: "#ffffff",
        },

        CONTACTS_SHEET: {
            HEADDER_FONT_COLOR: "#f3f3f3",
            HEADDER_COLOR: "#51808b",
            FIRST_ROW_COLOR: "#ffffff",
            SECOND_ROW_COLOR: "#ffffff",
        },

        nameSheetSelectBgColor: "#d1c7eb",
        nameSheetSelectFontColor: "#2c1763",
        nameSheetTodayDateHighlightColor: "#00ff00",
        nameSheetInputNewHighlightColor: "#38761d",

        DO_SELECT_BG_COLOR: "#e6a7a7",
        DO_SELECT_FONT_COLOR: "#6d4141",
        INPUT_NEW_FONT_COLOR: "#d9ead3",
    } as ITheme;
}