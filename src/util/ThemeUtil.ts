import { Theme } from "../model/Theme";

export class ThemeUtil {
    private defaultTheme: Theme = {
        fontFamily: "VERDANA",
        textColor: "#2a5e90",
        defaultBandingTheme: SpreadsheetApp.BandingTheme.GREEN,
        cityTableHeadderColor: "#36721b",
        cityTableFirstRowColor: "#ffffff",
        cityTableSecondRowColor: "#e7f9ef",
        lovTableHeadderColor: "#36721b",
        lovTableFirstRowColor: "#ffffff",
        lovTableSecondRowColor: "#e7f9ef",
        nameTableHeadderColor: "#36721b",
        nameTableFirstRowColor: "#ffffff",
        nameTableSecondRowColor: "#e7f9ef",
        overviewTableHeadderColor: "#36721b",
        overviewTableFirstRowColor: "#ffffff",
        overviewTableSecondRowColor: "#e7f9ef"
    } as Theme;

    private static instance : ThemeUtil;

    public static getCurrentTheme(): Theme {
        if(ThemeUtil.instance == null){
            ThemeUtil.instance = new ThemeUtil();
        }
        return ThemeUtil.instance.defaultTheme;
    }

    public static getCurrentSpreadsheetTheme(theme: GoogleAppsScript.Spreadsheet.SpreadsheetTheme): GoogleAppsScript.Spreadsheet.SpreadsheetTheme {
        return theme.setFontFamily(ThemeUtil.getCurrentTheme().fontFamily)
            .setConcreteColor(SpreadsheetApp.ThemeColorType.TEXT, ThemeUtil.buildColor(ThemeUtil.getCurrentTheme().textColor));
    }

    private static buildColor(rbgColor: string): GoogleAppsScript.Spreadsheet.Color {
        return SpreadsheetApp.newColor()
            .setRgbColor(rbgColor)
            .build();
    }


}

