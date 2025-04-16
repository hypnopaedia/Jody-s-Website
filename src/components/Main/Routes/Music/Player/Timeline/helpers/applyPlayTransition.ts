import { RefObject } from "react";
import { AUDIO_TIMEOUT_MS } from "../../../constants";

export const applyPlayTransition = (
    duration: number | undefined,
    activeAudioRef: RefObject<HTMLAudioElement | null>,
    foregroundLineRef: RefObject<HTMLDivElement | null>,
) => {
    if ( !foregroundLineRef.current ) return;
    const currentTime = activeAudioRef.current?.currentTime;

    const transitionDurationSeconds = (duration ?? 0) - (currentTime ?? 0);
    foregroundLineRef.current.style.transitionDuration = `${transitionDurationSeconds}s`;

    // delay setting width for transition to take effect
    setTimeout(() => { 
        if (foregroundLineRef.current) foregroundLineRef.current.style.width = '100%';
    }, AUDIO_TIMEOUT_MS);
}
