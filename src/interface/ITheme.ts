export interface ITheme {
    //common to all
    fontFamily: string,
    fontVerticalAlignment: "top" | "middle" | "bottom",
    bandingTheme: GoogleAppsScript.Spreadsheet.BandingTheme,
    textColor: string,
    headderFontSize: number,
    headderFontWeight: GoogleAppsScript.Spreadsheet.FontWeight,
    headderFontAlignment: "left" | "center" | "normal",
    borderColor: string,
    rowHeight: number,
    colWidthOffset: number,

    //sheet specific 
    cityTableHeadderFontColor: string,
    cityTableHeadderColor: string,
    cityTableFirstRowColor: string,
    cityTableSecondRowColor: string,

    lovTableHeadderFontColor: string,
    lovTableHeadderColor: string,
    lovTableFirstRowColor: string,
    lovTableSecondRowColor: string,

    nameTableHeadderFontColor: string,
    nameTableHeadderColor: string,
    nameTableFirstRowColor: string,
    nameTableSecondRowColor: string,

    overviewTableHeadderFontColor: string,
    overviewTableHeadderColor: string,
    overviewTableFirstRowColor: string,
    overviewTableSecondRowColor: string,
}