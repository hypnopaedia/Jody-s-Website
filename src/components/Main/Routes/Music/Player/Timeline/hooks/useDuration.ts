import { useEffect, useState } from "react";

import { useActiveAudioRef } from "../../../hooks/useActiveAudioRef";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

export const useDuration = () => {
    const audio = useActiveAudioRef();

    const { trackId, albumId } = usePlayer();
    const [duration,setDuration] = useState<number | undefined>(audio.current?.duration);

    useEffect(() => {
        if ( !audio.current ) return;
        
        audio.current.addEventListener('loadedmetadata', sendDuration);

        return () => {
            if ( !audio.current ) return;
            audio.current.removeEventListener('loadedmetadata', sendDuration); 
        }
    },[trackId, albumId]);

    return duration;

    function sendDuration() {
        setDuration(audio.current?.duration);
    }
}
