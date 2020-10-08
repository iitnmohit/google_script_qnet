import { ITheme } from "../interface/ITheme";

export class DefaultTheme implements ITheme {
    public static readonly instance = new DefaultTheme();

    fontFamily: string = "VERDANA";
    defaultBandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme = SpreadsheetApp.BandingTheme.GREEN;
    textColor: string = "#2a5e90";
    headderFontSize: number = 10;
    borderColor: string = "#000000";
    rowHeight: number = 25;
    colWidthOffset: number = 14;

    cityTableHeadderFontColor: string = "#ffffff";
    cityTableHeadderColor: string = "#274e13";
    cityTableFirstRowColor: string = "#ffffff";
    cityTableSecondRowColor: string = "#ffffff";

    lovTableHeadderFontColor: string = "#990000";
    lovTableHeadderColor: string = "#f4cccc";
    lovTableFirstRowColor: string = "#ffffff";
    lovTableSecondRowColor: string = "#ffffff";

    nameTableHeadderFontColor: string = "#ffffff";
    nameTableHeadderColor: string = "#6aa84f";
    nameTableFirstRowColor: string = "#ffffff";
    nameTableSecondRowColor: string = "#ffffff";

    overviewTableHeadderFontColor: string = "#ff0000";
    overviewTableHeadderColor: string = "#ffd966";
    overviewTableFirstRowColor: string = "#ffffff";
    overviewTableSecondRowColor: string = "#ffffff";
}