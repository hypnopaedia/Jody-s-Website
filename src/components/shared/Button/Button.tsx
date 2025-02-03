import { JSX, MouseEventHandler } from 'react';
import { useThemeProps } from 'src/theme/memo/useThemeProps';

export type ButtonProps = {
    children: JSX.Element | string | undefined,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const Button = ({ children: label, className, onClick }: ButtonProps) => {
    const themeProps = useThemeProps(className, { fillOnHover: true });

    return (
        <button
            {...themeProps}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
