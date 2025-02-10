import { CSSProperties, RefObject } from 'react';
import { Children } from '../types';
import clsx from 'clsx';

type Props = {
    children?: Children,
    className?: string,
    ref?: RefObject<HTMLDivElement | null>,
    style?: CSSProperties,

    width?: string,
    flexGrow?: number,
    flexShrink?: number,

    padding?: number | string,

    // breakpoints
    col?: number,
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number,
}

export const FlexItem = ({ 
    children, className, ref, style, 
    width, flexGrow, flexShrink,
    padding,
    col=12,xs,sm,md,lg,xl,xxl
}: Props) => (
    <div 
        ref={ref}
        className={clsx(
            className,
            col && `col-${col}`,
            xs && `col-xs-${xs}`,
            sm && `col-sm-${sm}`,
            md && `col-md-${md}`,
            lg && `col-lg-${lg}`,
            xl && `col-xl-${xl}`,
            xxl && `col-xxl-${xxl}`,
            typeof padding === 'number' ? `p-${padding}` : padding,
        )}
        style={{
            backgroundColor: 'transparent',
            flexBasis: 'auto',
            width,
            flexGrow,
            flexShrink,
            ...style
        }}
    >
        {children}
    </div>
);
