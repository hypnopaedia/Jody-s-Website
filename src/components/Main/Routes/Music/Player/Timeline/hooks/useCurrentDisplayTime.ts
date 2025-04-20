import { useEffect, useMemo, useRef, useState } from "react";

import { NULL_TIME } from "../../../constants";
import { secondsToDisplayTime } from "src/util/secondsToDisplayTime";

import { useActiveAudioRef } from "../../../hooks/useActiveAudioRef";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useCurrentDisplayTime = () => {
    const activeAudio = useActiveAudioRef();
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    const { albumId, trackId, lastStartTime, isPlaying } = usePlayer();
    const [trackedTime, setTrackedTime] = useState(lastStartTime ?? 0);

    // update on any changes to last recorded start time from external sources
    useEffect(() => {
        setTrackedTime(lastStartTime ?? 0);
        timeoutsRef.current.forEach((t) => clearTimeout(t)); // clear existing
        updateTrackedTime(); // start anew
    },[albumId, trackId, lastStartTime]);

    // keep tracked time updated via timeout
    useEffect(() => {
        if ( isPlaying ) {
            if ( !activeAudio.current ) return;
            timeoutsRef.current.push(setTimeout(updateTrackedTime,100)); // small timeout to let audio start playing
        }

        return () => {
            timeoutsRef.current.forEach((t) => clearTimeout(t));
        }
    },[isPlaying]);

    return useMemo(() => 
        !isNaN(trackedTime) ? secondsToDisplayTime(trackedTime) : NULL_TIME
    , [trackedTime]);

    function updateTrackedTime() {
        // skip if we can't calculate or audio was paused
        if ( !activeAudio.current || !isPlaying ) return;
        
        // handling by simple 1000ms timeouts can cause display skips and other issues;
        // so, check our fraction
        const currentTime = activeAudio.current.currentTime;
        let fractionToNextWholeSecond = currentTime < 1 ? (
            1 - currentTime // skip the divide-by-0 error on (0.9 % Math.floor(0.9))
        ) : (
            1 - (currentTime % Math.floor(currentTime))
        );
        
        // if we're w/in a hundredth of the top of the second, stay the course; whole seconds are fine
        const timeoutMs = ( isNaN(fractionToNextWholeSecond) || fractionToNextWholeSecond > 0.9) 
            ? 1000 
            : (1000*fractionToNextWholeSecond) + 20; // else, course correct with the fraction + a buffer

        setTrackedTime(activeAudio.current.currentTime);
        timeoutsRef.current.push(setTimeout(updateTrackedTime,timeoutMs));
    }
}
