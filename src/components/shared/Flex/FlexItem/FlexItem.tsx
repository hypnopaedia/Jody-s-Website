import React, { JSX } from 'react';

type Props = {
    children?: JSX.Element[] | JSX.Element,
    className?: string,

    width?: string,
    flexGrow?: number,
    flexShrink?: number
}

export const FlexItem = ({ children, className, width, flexGrow, flexShrink }: Props) => (
    <div 
        className={className}
        style={{
            backgroundColor: 'transparent',
            flexBasis: 'auto',
            width,
            flexGrow,
            flexShrink
        }}
    >
        {children}
    </div>
);
