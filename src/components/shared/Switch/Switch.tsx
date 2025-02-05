import { useContext, useEffect, useRef, useState, JSX } from 'react';

import { getReverseThemeColor } from 'src/theme/helpers/getReverseThemeColor';
import { getThemeProps } from 'src/theme/memo/useThemeProps';
import { ThemeColorContext } from 'src/theme/context/ThemeColorContext';

import clsx from 'clsx';
import classes from './Switch.module.scss';
import { Flex } from '../Flex/Flex';

type Props = {
    className?: string,
    buttonClassName?: string,
    onClick?: (checked: boolean) => void,
    value: boolean | undefined,

    left?: JSX.Element | string | undefined,
    right?: JSX.Element | string | undefined,
}

export const Switch = ({ className, buttonClassName, onClick, value, left, right }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const themeColor = useContext(ThemeColorContext);
    const outerThemeProps = getThemeProps(themeColor);
    const innerThemeProps = getThemeProps(getReverseThemeColor(themeColor));

    const [checked, setChecked] = useState(value ?? false);

    useEffect(() => {
        onClick && onClick(checked);
    },[checked]);

    return (
        <Flex justifyContent='center' alignItems='center' className={clsx('width-fit-content', 'm-0', 'p-0', className)}>
            {left}
            <div 
                {...outerThemeProps}
                className={clsx(classes.switch, outerThemeProps.className, buttonClassName)}
                onClick={handleClick}
            >
                <div
                    {...innerThemeProps}
                    className={clsx(
                        classes.indicator,
                        innerThemeProps.className,
                        checked && classes.on
                    )}
                >
                </div>
            </div>
            <input 
                ref={inputRef}
                type="checkbox" 
                hidden={true} 
                checked={checked} 
                aria-hidden="true" 
                onChange={handleChange} 
            />
            {right}
        </Flex>
    );

    function handleChange() {
        setChecked(!checked);
    }

    function handleClick() {
        if ( inputRef.current !== null ) inputRef.current.click();
    }
}
