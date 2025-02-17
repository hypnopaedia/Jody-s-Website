import { useEffect, useRef, useState } from "react";
import { Input, InputProps } from "./Input";

export type DebounceInputProps = InputProps & {
    debounceRate?: number,
}

export const DebounceInput = ({ value: outerValue, onChange, debounceRate=350, ...inputProps }: DebounceInputProps) => {
    const [value,setValue] = useState<string | undefined>(outerValue);

    const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onChange(value), debounceRate);
    },[value]);

    return (
        <Input
            value={value}
            onChange={setValue}
            {...inputProps}
        />
    );
}
