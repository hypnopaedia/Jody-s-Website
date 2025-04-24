import { RefObject, useEffect, useRef, useState } from "react";

import { applyPlayTransition } from "../helpers/applyPlayTransition";
import { AUDIO_TIMEOUT_MS } from "../../../constants";
import { MD_BREAKPOINT } from "src/util/breakpoints";

import { useActiveTrack } from "src/redux/Music/hook/active/useActiveTrack";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

// TODO: separate into separate hooks or helper functions for readability 
export const useHandleTimelineTransitions = (
    activeAudioRef: RefObject<HTMLAudioElement | null>,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
) => {
    const { albumId, trackId, lastStartTime, isPlaying } = usePlayer();
    const { duration } = useActiveTrack() ?? {};

    const initialRender = useRef<boolean>(true);
    const [isRenderTimeline,setIsRenderTimeline] = useState(window.innerWidth >= MD_BREAKPOINT);
    const isSongChange = useRef(false);

    // Window Resize - The timeline needs to display or not based on the window size
        // this is handled by simple css breakpoints, but the transitions also need to be reapplied on re-display
    useEffect(() => {
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[]);

    // Song Change - Reset the timeline width with no transitions
    useEffect(() => {
        if ( !foregroundLineRef.current || !activeAudioRef.current ) return;

        isSongChange.current = true; // block the other hook while this is happening

        foregroundLineRef.current.style.transitionDuration = '0ms';
        setTimeout(() => {
            if ( !foregroundLineRef.current ) return;
            foregroundLineRef.current.style.width = '1px';
        }, AUDIO_TIMEOUT_MS);
        // TODO - make this timeout an event listener for loadeddata/playing/canplay/
        activeAudioRef.current.addEventListener('loadeddata', handleSongChange);

        return () => activeAudioRef.current?.removeEventListener('loadeddata', handleSongChange);
    }, [albumId,trackId]);

    // Time Change - apply transition from proper width when time is changed by user via click/drag timeline or rewind button
    useEffect(() => {
        if ( !foregroundLineRef.current || !activeAudioRef.current || isSongChange.current ) return;
        
        foregroundLineRef.current.style.transitionDuration = '0ms';

        activeAudioRef.current.addEventListener('playing', handleTimeChange);

        // return () => activeAudioRef.current?.removeEventListener('playing', handleTimeChange);
    },[lastStartTime]);

    // Play/Pause - if playing, apply transition; if paused, set the current width to prepare for the next play
    useEffect(() => {
        if ( !foregroundLineRef.current || !activeAudioRef.current || isSongChange.current ) return;
        
        foregroundLineRef.current.style.transitionDuration = '0ms';
        const { currentTime, duration } = activeAudioRef.current;

        if ( isPlaying ) {
            applyPlayTransition(lastStartTime, duration, foregroundLineRef);
        } else {
            const percentagePlayed = (currentTime / duration) * 100;
            foregroundLineRef.current.style.width = `calc(${percentagePlayed}% + 1px)`; // 1px helps to smooth
        }
    }, [isPlaying, foregroundLineRef, isSongChange.current]);

    // Render/Hide: Handling on show/hide based on passing the breakpoint
    useEffect(() => {
        // When passing the breakpoint to display the timeline (after having hid it at least once): apply transitions
        if ( isRenderTimeline && !initialRender.current ) {
            if ( !activeAudioRef.current || !foregroundLineRef.current ) return;

            const { currentTime, duration } = activeAudioRef.current;
            const percent = (currentTime / duration) * 100;
            foregroundLineRef.current.style.width = percent + '%';
            
            setTimeout(() => applyPlayTransition(lastStartTime, duration, foregroundLineRef), AUDIO_TIMEOUT_MS);
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

    function handleSongChange() {
        if ( !foregroundLineRef.current || !activeAudioRef.current ) return;
        foregroundLineRef.current.style.width = '1px';

        if ( isPlaying ) {
            setTimeout(() => {
                if ( !activeAudioRef.current ) return;

                const { currentTime } = activeAudioRef.current;

                applyPlayTransition(currentTime, duration, foregroundLineRef);
            },AUDIO_TIMEOUT_MS);
        }
    
        isSongChange.current = false; // re-allow
        activeAudioRef.current?.removeEventListener('loadeddata', handleSongChange);
    }

    function handleTimeChange() {
        // if there's no lag this happens too quick! so use a timeout anyway
        setTimeout(() => {
            if ( !foregroundLineRef.current || !activeAudioRef.current ) return;
        
            const { currentTime, duration } = activeAudioRef.current;
            const percentagePlayed = (currentTime / duration) * 100;
            foregroundLineRef.current.style.width = `calc(${percentagePlayed}% + 1px)`; // 1px helps to smooth

            if ( isPlaying ) {
                setTimeout(() => applyPlayTransition(lastStartTime, duration, foregroundLineRef), AUDIO_TIMEOUT_MS);
            }
            activeAudioRef.current?.removeEventListener('playing', handleTimeChange);
        }, AUDIO_TIMEOUT_MS);
    }
}
