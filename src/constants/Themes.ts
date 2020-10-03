import { ITheme } from "../model/ITheme";

export class DefaultTheme implements ITheme {
    public static readonly instance = new DefaultTheme();

    fontFamily: string = "VERDANA";
    defaultBandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme = SpreadsheetApp.BandingTheme.GREEN;
    textColor: string = "#2a5e90";
    headderFontSize: number = 11;
    borderColor: string = "#000000";

    cityTableHeadderFontColor: string = "#ffffff";
    cityTableHeadderColor: string = "#274e13";
    cityTableFirstRowColor: string = "#ffffff";
    cityTableSecondRowColor: string = "#ffffff";

    lovTableHeadderFontColor: string = "#ffffff";
    lovTableHeadderColor: string = "#7f6000";
    lovTableFirstRowColor: string = "#ffffff";
    lovTableSecondRowColor: string = "#ffffff";

    nameTableHeadderFontColor: string = "#ffffff";
    nameTableHeadderColor: string = "#ca7925";
    nameTableFirstRowColor: string = "#ffffff";
    nameTableSecondRowColor: string = "#ffffff";

    overviewTableHeadderFontColor: string = "#ffffff";
    overviewTableHeadderColor: string = "#36721b";
    overviewTableFirstRowColor: string = "#ffffff";
    overviewTableSecondRowColor: string = "#e7f9ef";
    rowHeight: number = 25;
    colWidthOffset: number = 10;
    checkBoxColWidth:number = 30;
}