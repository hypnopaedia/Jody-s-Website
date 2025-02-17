import { RefObject } from "react";
import { Children, FlexWrap } from "./types";
import clsx from "clsx";


type Props = {
    children: Children,
    className?: string,
    ref?: RefObject<HTMLDivElement | null>,

    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: FlexWrap;
    gap?: string | number;

    padding?: number | string;
}

export const Flex = ({ 
    children, 
    className, 
    ref,

    justifyContent,
    alignItems,
    alignContent,
    gap,

    padding, 
    ...flexProperties 
}: Props) => (
    <div 
        ref={ref}
        className={clsx(
            'd-flex',
            'container-fluid',
            !!justifyContent && justifyContent.split(' ').map(jc => `justify-content-${jc}`),
            !!alignItems && `align-items-${alignItems}`,
            !!alignContent && `align-content-${alignContent}`,
            padding !== undefined && (typeof padding === 'number' ? `p-${padding}` : (padding?.startsWith('p-') ? padding : `p-${padding}`)),
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
