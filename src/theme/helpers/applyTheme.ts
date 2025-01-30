import { JSX } from 'react';
import clsx from 'clsx';
import { Theme, ThemeOptions } from "../types";
import { THEME_CLASS_DATA, THEME_CLASS_PREFIXES } from '../constants';
import { getReverse } from './getReverse';

type PartialComponentProps = {
    className?: string
}

export const applyTheme = (theme: Theme, options?: ThemeOptions): PartialComponentProps => {
    return {
        className: clsx(
            THEME_CLASS_PREFIXES
                .filter((prefix) => {
                    const data = THEME_CLASS_DATA[prefix];
                    return !data.optionKey || (!!data.optionKey && !!options?.[data.optionKey]);
                })
                .map((prefix) => {
                    const data = THEME_CLASS_DATA[prefix];
                    const classTheme = data.reverse ? getReverse(theme) : theme;
                    return `${prefix}-${classTheme}`;
                })
        )
    };
}
