import { useEffect } from 'react';

import { NO_ALBUM_ART_IMG } from '../constants';
import { setIsPlaying, setPlayerTrack, toggleIsPlaying } from 'src/redux/Music/slice';

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
                                <IconButton className={classes.playerControl}>fast_rewind</IconButton>
                                <IconButton className={classes.playPause} onClick={() => dispatch(setIsPlaying(!isPlaying))}>{isPlaying ? 'pause' : 'play_arrow'}</IconButton>
                                <IconButton className={classes.playerControl} onClick={fastForward}>fast_forward</IconButton>
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

    // TODO: Make this a redux action, as well as rewind
    function fastForward() {
        if ( !album?.tracks || !allAlbums ) return;

        const lastTrackOfAlbum = album.tracks[album.tracks.length - 1];
        const lastAlbum = allAlbums[allAlbums.length - 1];

        if ( track?.id === lastTrackOfAlbum.id ) {
            if ( album.id === lastAlbum.id ) {
                dispatch(setPlayerTrack({ trackId: allAlbums[0].tracks[0].id, albumId: allAlbums[0].id }))
            } else {
                const currentAlbumIndex = allAlbums.findIndex((a) => a.id === albumId);
                if ( currentAlbumIndex === -1 ) return;
                dispatch(setPlayerTrack({ 
                    trackId: allAlbums[currentAlbumIndex+1].tracks[0].id, 
                    albumId: allAlbums[currentAlbumIndex+1].id 
                }));
            }
        } else {
            const currentTrackIndex = album.tracks.findIndex((t) => t.id === trackId);
            dispatch(setPlayerTrack({
                trackId: album.tracks[currentTrackIndex + 1].id,
                albumId
            }))
        }
    }

    function togglePlay(e: KeyboardEvent) {
        e.preventDefault();
        e.stopPropagation();
        if ( e.key === " " ) dispatch(toggleIsPlaying());
    }
}