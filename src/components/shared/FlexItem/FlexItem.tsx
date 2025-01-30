import React, { JSX } from 'react';

type Props = {
    children: JSX.Element[] | JSX.Element | undefined,

    width?: string,
    flexGrow?: number,
    flexShrink?: number
}

export const FlexItem = ({ children, width, flexGrow, flexShrink }: Props) => (
    <div 
        style={{
            flexBasis: 'auto',
            width,
            flexGrow,
            flexShrink
        }}
    >
        {children}
    </div>
);
