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
}

