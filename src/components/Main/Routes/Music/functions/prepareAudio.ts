import Hls from "hls.js";
import { RefObject } from "react";
import { BACKEND_URL, PHRASE } from "src/axios/constants";
import { ListeningSession, Track } from "src/redux/Music/types";

const PLAYLIST_URL = BACKEND_URL + '/listening/playlist.php';

export const prepareAudio = async (
    track: Track,
    audioRef: RefObject<HTMLAudioElement | null>,
    listeningSession: ListeningSession | undefined,
) => {
    if ( !listeningSession?.uuid ) return;

    const audio = audioRef.current;
    if ( !audio ) return;

    if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(`${PLAYLIST_URL}?track=${track.url}&token=${listeningSession?.uuid}`);
        hls.attachMedia(audio);

        hls.config.xhrSetup = function (xhr) {
            xhr.setRequestHeader('Auth', `Bearer ${PHRASE}`);
        };

    } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = PLAYLIST_URL;
    }
}
