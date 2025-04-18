import { RefObject, useEffect, useRef, useState } from "react";

import { applyPlayTransition } from "../helpers/applyPlayTransition";
import { AUDIO_TIMEOUT_MS } from "../../../constants";
import { MD_BREAKPOINT } from "src/util/breakpoints";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useHandleTimelineTransitions = (
    activeAudioRef: RefObject<HTMLAudioElement | null>,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
) => {
    const { currentTime: lastStartTime, duration, isPlaying, albumId, trackId } = usePlayer();
    const isSongChange = useRef(false);

    const [isRenderTimeline,setIsRenderTimeline] = useState(window.innerWidth >= MD_BREAKPOINT);
    const initialRender = useRef<boolean>(true);

    // Window Resize - The timeline needs to display or not based on the window size
        // this is handled by simple css breakpoints, but the transitions also need to be reapplied on re-display
    useEffect(() => {
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[]);

    // Song Change - Reset the timeline width with no transitions
    useEffect(() => {
        if ( !foregroundLineRef.current ) return;

        isSongChange.current = true; // block the other hook while this is happening

        foregroundLineRef.current.style.transitionDuration = '0ms';
        setTimeout(() => {
            if ( !foregroundLineRef.current ) return;
            foregroundLineRef.current.style.width = '1px';
        
            isSongChange.current = false; // re-allow
        }, AUDIO_TIMEOUT_MS);
    }, [albumId,trackId]);

    // Time Change - apply transition from proper width when time is changed by user via click/drag timeline or rewind button
    useEffect(() => {
        if ( !foregroundLineRef.current || isSongChange.current ) return;
        
        foregroundLineRef.current.style.transitionDuration = '0ms';

        setTimeout(() => {
            if ( !foregroundLineRef.current ) return;

            const percentagePlayed = ((activeAudioRef.current?.currentTime ?? 0) / (duration ?? 1) * 100);
            foregroundLineRef.current.style.width = `calc(${percentagePlayed}% + 1px)`; // 1px helps to smooth

            if ( isPlaying ) setTimeout(() => applyPlayTransition(lastStartTime, duration, foregroundLineRef), AUDIO_TIMEOUT_MS);
        },AUDIO_TIMEOUT_MS);
    },[lastStartTime]);

    // Play/Pause - if playing, apply transition; if paused, set the current width to prepare for the next play
    useEffect(() => {
        if ( !foregroundLineRef.current || !activeAudioRef.current || !duration || isSongChange.current ) return;
        
        foregroundLineRef.current.style.transitionDuration = '0ms';

        if ( isPlaying ) {
            applyPlayTransition(lastStartTime, duration, foregroundLineRef);
        } else {
            const percentagePlayed = ((activeAudioRef.current.currentTime ?? 0) / (duration ?? 1) * 100);
            foregroundLineRef.current.style.width = `calc(${percentagePlayed}% + 1px)`; // 1px helps to smooth
        }
    }, [duration, isPlaying, foregroundLineRef, isSongChange.current]);

    // Render/Hide: Handling on show/hide based on passing the breakpoint
    useEffect(() => {
        // When passing the breakpoint to display the timeline (after having hid it at least once): apply transitions
        if ( isRenderTimeline && !initialRender.current ) {
            if ( !activeAudioRef.current || !foregroundLineRef.current ) return;

            const currentTime = activeAudioRef.current?.currentTime;
            const percent = (currentTime / (duration ?? 1) * 100);
            foregroundLineRef.current.style.width = percent + '%';
            
            setTimeout(() => applyPlayTransition(lastStartTime,duration,foregroundLineRef), AUDIO_TIMEOUT_MS);
        }

        // When passing the breakpoint to hide the timeline: remove transitions and set static values
        if ( !isRenderTimeline ) {
            if ( !foregroundLineRef.current ) return;
            
            foregroundLineRef.current.style.transitionDuration = '0ms';
            setTimeout(() => {
                if ( !foregroundLineRef.current ) return;
                foregroundLineRef.current.style.width = foregroundLineRef.current.clientWidth + 'px';
            },AUDIO_TIMEOUT_MS);
            
            initialRender.current = false;
        }

    },[isRenderTimeline])

    function handleResize() {
        if ( window.innerWidth >= MD_BREAKPOINT ) setIsRenderTimeline(true);
        else setIsRenderTimeline(false); 
    }
}
