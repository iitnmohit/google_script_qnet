import { ITheme } from "../interface/ITheme";

export class Themes {
    public static readonly DEFAULT = {
        fontFamily: "VERDANA",
        defaultBandingTheme: SpreadsheetApp.BandingTheme.GREEN,
        textColor: "#2a5e90",
        headderFontSize: 10,
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

        overviewTableHeadderFontColor: "#ff0000",
        overviewTableHeadderColor: "#ffd966",
        overviewTableFirstRowColor: "#ffffff",
        overviewTableSecondRowColor: "#ffffff",
    } as ITheme;
}