import { THEME_CLASS_PREFIXES } from './constants';

export type Theme = 'primary' | 'secondary';
export type ThemeClassData = {
    optionKey?: keyof ThemeOptions,
    reverse?: boolean,
}
export type ThemeClassPrefix = typeof THEME_CLASS_PREFIXES[number];
export type ThemeMode = 'light' | 'dark';
export type ThemeOptions = {
    fillOnHover?: boolean,
}
