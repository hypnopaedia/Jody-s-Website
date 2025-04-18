import { RefObject } from "react";
import { AUDIO_TIMEOUT_MS } from "../../../constants";

export const applyPlayTransition = (
    currentTime: number | undefined,
    duration: number | undefined,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
) => {
    if ( !foregroundLineRef.current ) return;

    const transitionDurationSeconds = (duration ?? 0) - (currentTime ?? 0);
    foregroundLineRef.current.style.transitionDuration = transitionDurationSeconds + 's';

    // delay setting width for transition to take effect
    setTimeout(() => { 
        if (foregroundLineRef.current) foregroundLineRef.current.style.width = '100%';
    }, AUDIO_TIMEOUT_MS);
}
