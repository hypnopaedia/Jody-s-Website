import { useEffect, useRef } from "react";

import { getActiveTrackAudioElement } from "../helpers/getActiveTrackAudioElement";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useActiveAudioRef = () => {
    const { trackId, albumId } = usePlayer();
    
    const activeAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        activeAudioRef.current = getActiveTrackAudioElement(trackId,albumId) as HTMLAudioElement | null;
    },[trackId,albumId]);

    return activeAudioRef;
}
