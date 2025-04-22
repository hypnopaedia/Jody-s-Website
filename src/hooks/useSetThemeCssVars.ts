import { useEffect } from "react";
import { useTheme } from "src/redux/Theme/hooks/useTheme";
import { THEME_DATA } from "src/theme/constants";
import { ThemeData } from "src/theme/types";

export const useSetThemeCssVars = () => {
    const theme = useTheme();
    const themeData: ThemeData = THEME_DATA[theme];

    useEffect(() => {
        Object.values(themeData.vars).forEach((cssVar) => {
            const { key, value } = cssVar;
            document.documentElement.style.setProperty(`--${key}`, String(value) ?? 'none');
        })
    }, [theme]);
}