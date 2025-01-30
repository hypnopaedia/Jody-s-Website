import React, { JSX } from "react";
import { FlexWrap } from "./types";

type Props = {
    children: JSX.Element[] | JSX.Element | undefined,
    className?: string,

    justifyContent?: string;
    alignItems?: string;
    flexWrap?: FlexWrap;
    gap?: string;
}

export const Flex = ({ children, className, justifyContent, alignItems, flexWrap, gap }: Props) => (
    <div 
        className={className}
        style={{
            display: 'flex',
            justifyContent,
            alignItems,
            flexWrap,
            gap
        }}
    >
        {children}
    </div>
);
