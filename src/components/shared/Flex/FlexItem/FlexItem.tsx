import { CSSProperties, JSX } from 'react';

type Props = {
    children?: JSX.Element[] | JSX.Element,
    className?: string,
    style?: CSSProperties,

    width?: string,
    flexGrow?: number,
    flexShrink?: number
}

export const FlexItem = ({ children, className, style, width, flexGrow, flexShrink }: Props) => (
    <div 
        className={className}
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
