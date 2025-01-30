import React, { JSX, MouseEventHandler } from 'react';
import { Theme } from 'src/theme/types';
import { applyTheme } from 'src/theme/helpers/applyTheme';

type Props = {
    children: JSX.Element | string | undefined,
    onClick?: MouseEventHandler<HTMLButtonElement>,

    theme?: Theme,
}

export const Button = ({ children: label, onClick, theme = 'primary' }: Props) => {
    return (
        <button
            {...applyTheme(theme, { fillOnHover: true })}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
