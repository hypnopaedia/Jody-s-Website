import { Theme, ThemeOptions } from "../types";
import { THEME_CLASS_DATA, THEME_CLASS_PREFIXES } from '../constants';
import { getReverse } from './getReverse';

import clsx from 'clsx';

type PartialComponentProps = {
    className?: string
}

export const applyTheme = (theme: Theme, externalClasses?: string, options?: ThemeOptions): PartialComponentProps => {
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
                    const classTheme = data.reverse ? getReverse(theme) : theme;
                    return `${prefix}-${classTheme}`;
                })
        )
    };
}
