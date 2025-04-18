import { RefObject, useEffect } from "react";

import { setCurrentTime as setPlayerStartTime } from 'src/redux/Music/slice';
import { useAppDispatch } from "src/redux/store";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useUpdateTrackTimeOnClick = (
    activeAudioRef: RefObject<HTMLAudioElement | null>,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
    linesContainerRef: RefObject<HTMLDivElement | null>,
) => {
    const dispatch = useAppDispatch();

    const { duration, isPlaying } = usePlayer();

    useEffect(() => {
        linesContainerRef.current?.addEventListener('mousedown', handleMouseDown);

        return () => { 
            linesContainerRef.current?.removeEventListener('mousedown', handleMouseDown); 
        }
    },[duration, isPlaying, activeAudioRef, linesContainerRef, foregroundLineRef]);

    function handleMouseDown(e: MouseEvent) {
        if ( !foregroundLineRef.current ) return;

        foregroundLineRef.current.style.transitionDuration = '0ms';
        snapForegroundLineWidthToMouse(e.offsetX);

        linesContainerRef.current?.addEventListener('mousemove', handleMouseMove);
        linesContainerRef.current?.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
        snapForegroundLineWidthToMouse(e.offsetX);
    }

    function handleMouseUp(e: MouseEvent) { 
        updateTrackTime(e);

        linesContainerRef.current?.removeEventListener('mousemove', handleMouseMove);
        linesContainerRef.current?.removeEventListener('mouseup', handleMouseUp);
    }

    function snapForegroundLineWidthToMouse(offsetX: number) {
        if ( !foregroundLineRef.current || !linesContainerRef.current ) return;

        const fullWidth = linesContainerRef.current?.clientWidth;
        const offsetPercentage = offsetX / fullWidth;
        
        if ( !foregroundLineRef.current ) return;
        const percentageWidth = fullWidth * offsetPercentage;
        
        foregroundLineRef.current.style.width = percentageWidth + 'px';
    }

    function updateTrackTime(e: MouseEvent) {
        if ( !linesContainerRef.current || !activeAudioRef.current ) return;
        
        // calculate and apply new time
        const offsetX = e.offsetX
        const fullWidth = linesContainerRef.current?.clientWidth;
        const offsetPercentage = offsetX / fullWidth;
        
        const updatedTimeSeconds = (activeAudioRef.current.duration ?? 0) * offsetPercentage;
        
        // remove transition for instantaneous switch
        if ( !!foregroundLineRef.current ) foregroundLineRef.current.style.transitionDuration = '0ms';
        
        // redux to reflect new time
        dispatch(setPlayerStartTime(updatedTimeSeconds));
    }
}
