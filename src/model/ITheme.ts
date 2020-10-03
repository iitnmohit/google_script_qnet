export interface ITheme {
    fontFamily: string;
    defaultBandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme;
    textColor: string;
    headderFontSize: number;
    borderColor:string;

    cityTableHeadderFontColor: string;
    cityTableHeadderColor: string;
    cityTableFirstRowColor: string;
    cityTableSecondRowColor: string;

    lovTableHeadderFontColor: string;
    lovTableHeadderColor: string;
    lovTableFirstRowColor: string;
    lovTableSecondRowColor: string;

    nameTableHeadderFontColor: string;
    nameTableHeadderColor: string;
    nameTableFirstRowColor: string;
    nameTableSecondRowColor: string;

    overviewTableHeadderFontColor: string;
    overviewTableHeadderColor: string;
    overviewTableFirstRowColor: string;
    overviewTableSecondRowColor: string;

    rowHeight: number;
    colWidthOffset:number;
}