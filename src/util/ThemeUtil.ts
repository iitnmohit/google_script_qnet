import { DefaultTheme } from "../constants/Themes";
import { ITheme } from "../model/ITheme";

export class ThemeUtil {
    private static defaultTheme: ITheme = DefaultTheme.instance;

    public static getCurrentTheme(): ITheme {
        return ThemeUtil.defaultTheme;
    }

    public static getCurrentSpreadsheetTheme(theme: GoogleAppsScript.Spreadsheet.SpreadsheetTheme)
        : GoogleAppsScript.Spreadsheet.SpreadsheetTheme {
        return theme.setFontFamily(ThemeUtil.getCurrentTheme().fontFamily)
            .setConcreteColor(SpreadsheetApp.ThemeColorType.TEXT, ThemeUtil.buildColor(ThemeUtil.getCurrentTheme().textColor));
    }

    private static buildColor(rbgColor: string): GoogleAppsScript.Spreadsheet.Color {
        return SpreadsheetApp.newColor()
            .setRgbColor(rbgColor)
            .build();
    }
}

