import { useEffect, useRef } from "react";

import { useThemeProps } from "src/theme/memo/useThemeProps";

import clsx from "clsx";
import classes from './DragBar.module.scss';
import { Flex } from "../Flex/Flex";
import { FlexItem } from "../Flex/FlexItem/FlexItem";

type Props = {
    initialValue?: number;
    className?: string;
    onChange?: (value: number | undefined) => void;
    onDrag?: (value: number | undefined) => void;
}

export const DragBar = ({ className, initialValue, onChange, onDrag }: Props) => {
    const dragbarRef = useRef<HTMLDivElement | null>(null);
    const activeLineRef = useRef<HTMLDivElement | null>(null);
    const stylusRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if ( !dragbarRef.current ) return;

        dragbarRef.current.addEventListener('mousedown', handleMouseDown);

        return () => dragbarRef.current?.removeEventListener('mousedown', handleMouseDown);
    },[]);

    useEffect(() => {
        if ( !initialValue || !dragbarRef.current || !activeLineRef.current ) return;

        const fullWidth = dragbarRef.current?.clientWidth;

        activeLineRef.current.style.width = `${fullWidth * initialValue}px`;
    },[initialValue]);

    return (
        <Flex 
            ref={dragbarRef}
            justifyContent="center"
            alignItems="center"
            className={clsx(className, classes.dragbar, 'p-0')}
            
        >
            <FlexItem>
                <div className={clsx(classes.line, classes.backgroundLine)}></div>
                <Flex alignItems="center" flexWrap="nowrap" className={clsx(classes.activeLineWrapper, 'p-0')}>
                    <div 
                        ref={activeLineRef} 
                        className={clsx(classes.line, classes.activeLine, classes.slidingWidth)} 
                    >                        
                    </div>
                    <div 
                        ref={stylusRef} 
                        {...useThemeProps(classes.stylus)} 
                    ></div>
                </Flex>
            </FlexItem>
        </Flex>
    );

    function handleMouseDown(e: MouseEvent) {
        if ( !dragbarRef.current || !activeLineRef.current ) return;

        activeLineRef.current.style.width = e.offsetX + 'px';

        dragbarRef.current.addEventListener('mousemove', handleMouseMove);
        dragbarRef.current.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
        if ( !dragbarRef.current || !activeLineRef.current ) return;

        if ( onDrag ) onDrag(getOffsetValue());

        const fullWidth = dragbarRef.current?.clientWidth;
        activeLineRef.current.style.width = Math.min(e.offsetX,fullWidth) + 'px';
    }

    function handleMouseUp(e: MouseEvent) {
        if ( !dragbarRef.current ) return;

        if ( onChange ) onChange(getOffsetValue());

        dragbarRef.current.removeEventListener('mousemove', handleMouseMove);
        dragbarRef.current.removeEventListener('mouseup', handleMouseUp);
    }

    // from 0 to 1 
    function getOffsetValue() {
        if ( !dragbarRef.current || !activeLineRef.current ) return;

        const offset = activeLineRef.current.clientWidth;
        const fullWidth = dragbarRef.current?.clientWidth;
        const offsetPercentage = (offset / fullWidth);
        
        return offsetPercentage;
    }
}
