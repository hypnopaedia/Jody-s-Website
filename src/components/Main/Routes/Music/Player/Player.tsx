import { useEffect } from 'react';

import { getNextTrack } from './helpers/getNextTrack';
import { getPreviousTrack } from './helpers/getPreviousTrack';
import { NO_ALBUM_ART_IMG } from '../constants';
import { setLastStartTime, setIsPlaying, setPlayerTrack, toggleIsPlaying } from 'src/redux/Music/slice';

import { useActiveAudioRef } from '../hooks/useActiveAudioRef';
import { useAlbum } from 'src/redux/Music/hook/useAlbum';
import { useAppDispatch } from 'src/redux/store';
import { useMusic } from 'src/redux/Music/hook/useMusic';
import { usePlayer } from 'src/redux/Music/hook/usePlayer';
import { useThemeProps } from 'src/theme/memo/useThemeProps';
import { useTrack } from 'src/redux/Music/hook/useTrack';

import clsx from 'clsx';
import classes from './Player.module.scss';
import { Flex } from 'src/components/shared/Flex/Flex';
import { FlexItem } from 'src/components/shared/Flex/FlexItem/FlexItem';
import { IconButton } from 'src/components/shared/Button/IconButton';
import { Timeline } from './Timeline/Timeline';
import { Volume } from './Volume/Volume';

export const Player = () => {
    const dispatch = useAppDispatch();

    const activeAudioRef = useActiveAudioRef();

    const { trackId, albumId, isPlaying } = usePlayer();
    const themeProps = useThemeProps(classes.player);

    const allAlbums = useMusic();
    const album = useAlbum(albumId);
    const track = useTrack(albumId,trackId);

    useEffect(() => {
        if ( !trackId || !albumId ) return;
        window.addEventListener('keypress', togglePlay);

        return () => window.removeEventListener('keypress', togglePlay);
    },[trackId,albumId]);

    if ( !trackId || !albumId ) return null;

    return (
        <div {...themeProps}>
            <Flex className='p-0 m-0 h-100'>
                <FlexItem col={10} md={3} >
                    <Flex alignItems='center' className='p-0 m-0 h-100'>
                        <img loading='lazy' src={album?.photo ?? NO_ALBUM_ART_IMG} className={classes.image} />
                        <FlexItem col={9} md={10} className={classes.trackData}>
                            <h6><b>{track?.title}</b></h6>
                            <p>{album?.title}</p>
                        </FlexItem>
                    </Flex>
                </FlexItem>
                <FlexItem col={2} md={6} >
                    <Flex justifyContent='center' alignItems='center' alignContent='center' flexWrap='wrap' className='d-none d-md-flex h-100'>
                        <FlexItem>
                            <Flex justifyContent='center' alignItems='center' gap={1} className={classes.controls}>
                                <IconButton className={classes.playerControl} onClick={handleRewind}>fast_rewind</IconButton>
                                <IconButton className={classes.playPause} onClick={() => dispatch(setIsPlaying(!isPlaying))}>{isPlaying ? 'pause' : 'play_arrow'}</IconButton>
                                <IconButton className={classes.playerControl} onClick={handleFastForward}>fast_forward</IconButton>
                            </Flex>
                        </FlexItem>
                        <FlexItem>
                            <Timeline />
                        </FlexItem>
                    </Flex>
                    <Flex justifyContent='end' alignItems='center' className='d-flex d-md-none h-100 p-1'>
                        <IconButton 
                            className={clsx(classes.playPause,classes.mobilePlayPause)} 
                            onClick={() => dispatch(setIsPlaying(!isPlaying))}
                        >
                                {isPlaying ? 'pause' : 'play_arrow'}
                        </IconButton>
                    </Flex>
                </FlexItem>
                <FlexItem col={3} className='d-none d-md-block'>
                    <Flex justifyContent='center' alignItems='center' className='h-100'>
                        <Volume />
                    </Flex>
                </FlexItem>
            </Flex>
        </div>
    );

    function handleRewind() {
        if ( !album?.tracks || !allAlbums || !activeAudioRef.current ) return;

        if ( activeAudioRef.current.currentTime > 1.5 ) {
            rewindTrack();
        } else {
            const previousTrack = getPreviousTrack(track, album, allAlbums);

            if ( !!previousTrack ) dispatch(setPlayerTrack(previousTrack));
            else rewindTrack(); // don't loop around to the back, just keep going back to 0
        }
    }

    function rewindTrack() {
        if ( !activeAudioRef.current ) return;

        // if last start time was already 0, this results in equal state; set to current time, then switch back to 0
        dispatch(setLastStartTime(activeAudioRef.current.currentTime));
        setTimeout(() => dispatch(setLastStartTime(0)), 50); 
    }

    // TODO: Make this a redux action, as well as rewind
    function handleFastForward() {
        if ( !album?.tracks || !allAlbums ) return;

        const nextTrack = getNextTrack(track, album, allAlbums);
        if ( !!nextTrack ) dispatch(setPlayerTrack(nextTrack));
    }

    function togglePlay(e: KeyboardEvent) {
        e.preventDefault();
        e.stopPropagation();
        if ( e.key === " " ) dispatch(toggleIsPlaying());
    }
}
