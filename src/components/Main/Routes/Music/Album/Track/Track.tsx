import { useEffect, useRef } from "react";

import { getAudioElementId } from "../../helpers/getAudioElementId";
import { getListeningSession } from "src/redux/Music/thunks/getListeningSession";
import { ListeningSession } from "src/redux/Music/types";
import { NULL_TIME } from "../../constants";
import { prepareAudio } from "../../helpers/prepareAudio";
import { secondsToDisplayTime } from "src/util/secondsToDisplayTime";
import { setIsPlaying, setPlayerTrack } from "src/redux/Music/slice";
import { Track as TrackType} from "src/redux/Music/types";

import { useAppDispatch } from "src/redux/store";
import { useMusicError } from "src/redux/Music/hook/music/useMusicError";
import { useIsActiveTrack } from "../../hooks/useIsTrackActive";
import { useListeningSession } from "src/redux/Music/hook/listeningSession/useListeningSession";
import { usePlayer } from "src/redux/Music/hook/usePlayer";

import classes from './Track.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { IconButton } from "src/components/shared/Button/IconButton";

export type Props = {
    track: TrackType,
    albumId: number,
}

// TODO: Reverse the flow so that the audio is play/paused first, then redux is updated
export const Track = ({ track, albumId }: Props) => {
    const dispatch = useAppDispatch();

    const listeningSession = useListeningSession();
    const error = useMusicError();

    const { lastStartTime, isPlaying, trackId: playerTrackId, albumId: playerAlbumId } = usePlayer();
    const isActiveTrack = useIsActiveTrack(track.id, albumId);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        handlePlayPause(listeningSession);

        async function handlePlayPause(existingListeningSession: ListeningSession | undefined) {
            const audio = audioRef.current;
            if ( !audio ) return;

            if ( isActiveTrack ) {
                if ( isPlaying ) {
                    const listeningSession = existingListeningSession ?? await dispatch(await getListeningSession());
                    if ( !audio.src && !error ) await prepareAudio(track,audioRef,listeningSession);
                    audio.play();
                }
                else audio.pause();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    },[playerTrackId, playerAlbumId, isPlaying]);

    useEffect(() => {
        if (!isActiveTrack || !audioRef.current) return;
        
        audioRef.current.currentTime = lastStartTime ?? 0;
    },[lastStartTime]);

    return (
        <>
            <FlexItem col={12}>
                <Flex className="px-2" alignItems="center">
                    <FlexItem col={2} lg={1}>
                        <IconButton onClick={handleClick}>{(isPlaying && isActiveTrack) ? 'pause' : 'play_arrow'}</IconButton>
                    </FlexItem>
                    <FlexItem col={1}>
                        <p>{track.trackNo}</p>
                    </FlexItem>
                    <FlexItem col={8} lg={9}>
                        <p>{track.title}</p>
                    </FlexItem>
                    <FlexItem col={1}>
                        <p className={classes.trackTime}>{secondsToDisplayTime(track.duration) ?? NULL_TIME}</p>
                    </FlexItem>
                </Flex>
            </FlexItem>
            <audio ref={audioRef}
                id={getAudioElementId(track.id, albumId)} 
                hidden 
                preload="metadata" 
                autoPlay={false} 
                controls={true}
                onEnded={() => { dispatch(setIsPlaying(false)) }}
            ></audio>
        </>
    );

    function handleClick() {
        if ( !isActiveTrack ) dispatch(setPlayerTrack({trackId: track.id, albumId}));
        else dispatch(setIsPlaying(!isPlaying));
        (document.activeElement as HTMLElement).blur(); // stop spacebar play/pause; handled by global player
    }
}
