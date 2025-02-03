import { JSX } from "react";
import { FlexWrap } from "./types";
import clsx from "clsx";

type Child = JSX.Element | string | undefined;

type Props = {
    children: Child[] | Child | undefined,
    className?: string,

    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: FlexWrap;
    gap?: string | number;

    padding?: number | string;
}

export const Flex = ({ 
    children, className, 

    justifyContent,
    alignItems,
    alignContent,
    gap,

    padding, 
    ...flexProperties 
}: Props) => (
    <div 
        className={clsx(
            'd-flex',
            'container-fluid',
            !!justifyContent && justifyContent.split(' ').map(jc => `justify-content-${jc}`),
            !!alignItems && `align-items-${alignItems}`,
            !!alignContent && `align-content-${alignContent}`,
            typeof padding === 'number' ? `p-${padding}` : padding,
            className
        )}
        style={{
            gap: typeof gap === 'string' ? gap : `${(gap ?? 0) * 8}px`,
            ...flexProperties
        }}
    >
        {children}
    </div>
);
