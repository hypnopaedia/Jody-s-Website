import { THEME_CLASS_PREFIXES } from './constants';

export type Theme = 'light' | 'dark';
export type ThemeColor = 'primary' | 'secondary';
export type ThemeClassData = {
    optionKey?: keyof ThemeOptions,
    reverse?: boolean,
}
export type ThemeClassPrefix = typeof THEME_CLASS_PREFIXES[number];
export type ThemeOptions = {
    fillOnHover?: boolean,
}

export type ThemeData = {
    mainContentColor: ThemeColor,
    vars: {
        primaryColor: CSSThemeProperty,
        secondaryColor: CSSThemeProperty,
        textColor: CSSThemeProperty,
        linkColor: CSSThemeProperty,
        detailTextColor: CSSThemeProperty,

        background: CSSThemeProperty,
        backgroundOpacity: CSSThemeProperty<number>,
        backgroundSize: CSSThemeProperty,
        backgroundFilter?: CSSThemeProperty,
        backgroundColor: CSSThemeProperty,

        headerGradient: CSSThemeProperty,
    }
}

export type CSSThemeProperty<T=string> = {
    key: string,
    value: T,
}
