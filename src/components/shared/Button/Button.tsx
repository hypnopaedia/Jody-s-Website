import { JSX, MouseEventHandler } from 'react';
import { useThemeProps } from 'src/theme/memo/useThemeProps';

export type ButtonProps = {
    children: JSX.Element | string | undefined,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    title?: string,
}

export const Button = ({ children: label, className, onClick, title }: ButtonProps) => {
    const themeProps = useThemeProps(className, { fillOnHover: true });

    return (
        <button
            {...themeProps}
            onClick={onClick}
            title={title}
        >
            {label}
        </button>
    );
}
