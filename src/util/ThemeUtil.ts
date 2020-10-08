import { Themes } from "../constants/Themes";
import { ITheme } from "../interface/ITheme";

export class ThemeUtil {
    private static currentTheme: ITheme = Themes.DEFAULT;

    public static getCurrentTheme(): ITheme {
        return ThemeUtil.currentTheme;
    }

    public static setCurrentTheme(theme: ITheme): void {
        ThemeUtil.currentTheme = theme;
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

