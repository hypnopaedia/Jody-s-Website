import React, { JSX, MouseEventHandler } from 'react';
import { Theme } from 'src/theme/types';
import { applyTheme } from 'src/theme/helpers/applyTheme';

export type ButtonProps = {
    children: JSX.Element | string | undefined,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,

    theme?: Theme,
}

export const Button = ({ children: label, className, onClick, theme = 'primary' }: ButtonProps) => {
    return (
        <button
            {...applyTheme(theme, className, { fillOnHover: true })}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
