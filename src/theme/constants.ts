import { ThemeClassData, ThemeClassPrefix } from "./types";

export const THEME_CLASS_PREFIXES = [
    'fill',
    'font',
    'border',

    'fill-on-hover',
] as const;

export const THEME_CLASS_DATA: { [ key in ThemeClassPrefix ]: ThemeClassData} = {
    fill: { reverse: true },
    font: { },
    border: { },
    "fill-on-hover": { optionKey: 'fillOnHover', },
}

export const ANIMATION_CLASSES = {
    fadeInFromRight: 'fade-in-from-right',
}
