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

        cityTableHeadderFontColor: "#ffffff",
        cityTableHeadderColor: "#274e13",
        cityTableFirstRowColor: "#ffffff",
        cityTableSecondRowColor: "#ffffff",

        lovTableHeadderFontColor: "#990000",
        lovTableHeadderColor: "#f4cccc",
        lovTableFirstRowColor: "#ffffff",
        lovTableSecondRowColor: "#ffffff",

        nameTableHeadderFontColor: "#ffffff",
        nameTableHeadderColor: "#6aa84f",
        nameTableFirstRowColor: "#ffffff",
        nameTableSecondRowColor: "#ffffff",
        nameSheetSelectBgColor: "#d1c7eb",
        nameSheetSelectFontColor: "#2c1763",
        nameSheetDoSelectBgColor: "#e6a7a7",
        nameSheetDoSelectFontColor: "#6d4141",

        overviewTableHeadderFontColor: "#ff0000",
        overviewTableHeadderColor: "#ffd966",
        overviewTableFirstRowColor: "#ffffff",
        overviewTableSecondRowColor: "#ffffff",
    } as ITheme;
}