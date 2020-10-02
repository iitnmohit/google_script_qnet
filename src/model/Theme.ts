export interface Theme {
    fontFamily?: string;
    textColor?: string;
    defaultBandingTheme?: GoogleAppsScript.Spreadsheet.BandingTheme;
    
    cityTableHeadderColor?: string;
    cityTableFirstRowColor?: string;
    cityTableSecondRowColor?: string;
    
    lovTableHeadderColor?: string;
    lovTableFirstRowColor?: string;
    lovTableSecondRowColor?: string;

    nameTableHeadderColor?: string;
    nameTableFirstRowColor?: string;
    nameTableSecondRowColor?: string;

    overviewTableHeadderColor?: string;
    overviewTableFirstRowColor?: string;
    overviewTableSecondRowColor?: string;
}