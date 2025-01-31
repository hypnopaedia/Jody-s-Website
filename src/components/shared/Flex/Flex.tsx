import React, { JSX } from "react";
import { FlexWrap } from "./types";

type Props = {
    children: JSX.Element[] | JSX.Element | undefined,
    className?: string,

    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: FlexWrap;
    gap?: string;
}

export const Flex = ({ 
    children, className, 
    ...flexProperties }: Props) => (
    <div 
        className={className}
        style={{
            display: 'flex',
            ...flexProperties
        }}
    >
        {children}
    </div>
);
