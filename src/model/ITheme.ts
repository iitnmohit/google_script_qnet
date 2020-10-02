export interface ITheme {
    fontFamily: string;
    defaultBandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme;
    textColor: string;

    cityTableHeadderColor: string;
    cityTableFirstRowColor: string;
    cityTableSecondRowColor: string;

    lovTableHeadderColor: string;
    lovTableFirstRowColor: string;
    lovTableSecondRowColor: string;

    nameTableHeadderColor: string;
    nameTableFirstRowColor: string;
    nameTableSecondRowColor: string;

    overviewTableHeadderColor: string;
    overviewTableFirstRowColor: string;
    overviewTableSecondRowColor: string;

    rowHeight: number;
}