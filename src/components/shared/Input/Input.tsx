import { RefObject } from "react";
import { useThemeProps } from "src/theme/memo/useThemeProps";

export type InputProps = {
    ref?: RefObject<HTMLInputElement>,
    className?: string,
    placeholder?: string,
    title?: string,

    value: string | undefined,
    onChange: (v: string | undefined) => void,
}

export const Input = ({className, onChange, ...props}: InputProps) => (
    <input
        {...useThemeProps(className)}
        {...props}
        onChange={(e) => onChange(e.target.value)}
    />
);
