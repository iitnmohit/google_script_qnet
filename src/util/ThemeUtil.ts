import { DefaultTheme } from "../constants/Themes";
import { ITheme } from "../interface/ITheme";

export class ThemeUtil {
    public static colWidthOffset: number = 10;
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

