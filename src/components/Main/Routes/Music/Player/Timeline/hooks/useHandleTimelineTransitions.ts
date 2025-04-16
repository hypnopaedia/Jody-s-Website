import { RefObject, useEffect, useRef } from "react";

import { applyPlayTransition } from "../helpers/applyPlayTransition";
import { AUDIO_TIMEOUT_MS } from "../../../constants";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useHandleTimelineTransitions = (
    activeAudioRef: RefObject<HTMLAudioElement | null>,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
) => {
    const { duration, isPlaying, albumId, trackId } = usePlayer();
    const isSongChange = useRef(false);

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

    // Play/Pause - if playing, apply transition; if paused, set the current width to prepare for the next play
    useEffect(() => {
        if ( !foregroundLineRef.current || !activeAudioRef.current || !duration || isSongChange.current ) return;
        
        foregroundLineRef.current.style.transitionDuration = '0ms';
        const currentTime = activeAudioRef.current?.currentTime;
        
        if ( isPlaying ) {
            applyPlayTransition(duration,activeAudioRef,foregroundLineRef);
        } else {
            const percentagePlayed = ((currentTime ?? 0) / (duration ?? 1) * 100);
            foregroundLineRef.current.style.width = percentagePlayed + '%';
        }
    }, [duration, isPlaying, foregroundLineRef, isSongChange.current]);
}
