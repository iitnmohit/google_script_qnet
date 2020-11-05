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


    CITY_SHEET: ITableTheme,
    LOV_SHEET: ITableTheme,
    NAME_LIST_SHEET: ITableTheme,
    OVERVIEW_SHEET: ITableTheme,
    CALENDER_SHEET: ITableTheme,
    CONTACTS_SHEET: ITableTheme;

    nameSheetSelectBgColor: string,
    nameSheetSelectFontColor: string,

    DO_SELECT_BG_COLOR: string,
    DO_SELECT_FONT_COLOR: string,
}

export interface ITableTheme {
    HEADDER_COLOR: string,
    HEADDER_FONT_COLOR: string,
    FIRST_ROW_COLOR: string,
    SECOND_ROW_COLOR: string,
}