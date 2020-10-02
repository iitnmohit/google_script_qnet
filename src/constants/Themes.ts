import { ITheme } from "../model/ITheme";

export class DefaultTheme implements ITheme {
    public static readonly instance = new DefaultTheme();

    fontFamily: string = "VERDANA";
    defaultBandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme = SpreadsheetApp.BandingTheme.GREEN;
    textColor: string = "#2a5e90";
    cityTableHeadderColor: string = "#36721b";
    cityTableFirstRowColor: string = "#ffffff";
    cityTableSecondRowColor: string = "#e7f9ef";
    lovTableHeadderColor: string = "#36721b";
    lovTableFirstRowColor: string = "#ffffff";
    lovTableSecondRowColor: string = "#e7f9ef";
    nameTableHeadderColor: string = "#36721b";
    nameTableFirstRowColor: string = "#ffffff";
    nameTableSecondRowColor: string = "#e7f9ef";
    overviewTableHeadderColor: string = "#36721b";
    overviewTableFirstRowColor: string = "#ffffff";
    overviewTableSecondRowColor: string = "#e7f9ef";
    rowHeight: number = 25;
}