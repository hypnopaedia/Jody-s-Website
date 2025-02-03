import { useContext, useMemo } from "react";

import { getReverseThemeColor } from '../helpers/getReverseThemeColor';
import { ThemeColorContext } from "../context/ThemeColorContext";
import { ThemeColor, ThemeOptions } from "../types";
import { THEME_CLASS_DATA, THEME_CLASS_PREFIXES } from '../constants';

import clsx from 'clsx';

type PartialComponentProps = {
    className?: string
}

export const useThemeProps = (externalClasses?: string, options?: ThemeOptions): PartialComponentProps => {
    const themeColor = useContext(ThemeColorContext);

    return useMemo(
        () => getThemeProps(themeColor,externalClasses,options), 
        [themeColor, externalClasses, options]
    );
}

export const getThemeProps = (themeColor: ThemeColor, externalClasses?: string, options?: ThemeOptions): PartialComponentProps => {
    return {
        className: clsx(
            externalClasses,
            THEME_CLASS_PREFIXES
                .filter((prefix) => {
                    const data = THEME_CLASS_DATA[prefix];
                    return !data.optionKey || (!!data.optionKey && !!options?.[data.optionKey]);
                })
                .map((prefix) => {
                    const data = THEME_CLASS_DATA[prefix];
                    const classTheme = data.reverse ? getReverseThemeColor(themeColor) : themeColor;
                    return `${prefix}-${classTheme}`;
                })
        )
    }
}
