import { ThemeData, ThemeClassData, ThemeClassPrefix, Theme } from "./types";
import { LIGHT_THEME } from "./data/light";
import { DARK_THEME } from "./data/dark";

export const THEME_CLASS_PREFIXES = [
    'fill',
    'font',
    'border',
    'color',

    'fill-on-hover',
] as const;

export const THEME_CLASS_DATA: { [ key in ThemeClassPrefix ]: ThemeClassData} = {
    fill: { reverse: true },
    font: { },
    border: { },
    color: { },
    "fill-on-hover": { optionKey: 'fillOnHover', },
}

export const ANIMATION_CLASSES = {
    fadeInFromRight: 'fade-in-from-right',
    shakeOnHover: 'shake-on-hover',
}

export const THEME_DATA: { [key in Theme]: ThemeData } = {
    'light': LIGHT_THEME,
    'dark': DARK_THEME,
} as const;
