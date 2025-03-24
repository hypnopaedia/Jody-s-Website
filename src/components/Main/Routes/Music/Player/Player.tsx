import { NO_ALBUM_ART_IMG } from '../constants';
import { setIsPlaying, setPlayerTrack } from 'src/redux/Music/slice';

import { useAlbum } from 'src/redux/Music/hook/useAlbum';
import { useAppDispatch } from 'src/redux/store';
import { useMusic } from 'src/redux/Music/hook/useMusic';
import { usePlayer } from 'src/redux/Music/hook/usePlayer';
import { useThemeProps } from 'src/theme/memo/useThemeProps';
import { useTrack } from 'src/redux/Music/hook/useTrack';

import classes from './Player.module.scss';
import { Flex } from 'src/components/shared/Flex/Flex';
import { FlexItem } from 'src/components/shared/Flex/FlexItem/FlexItem';
import { IconButton } from 'src/components/shared/Button/IconButton';

export const Player = () => {
    const dispatch = useAppDispatch();

    const { trackId, albumId, isPlaying } = usePlayer();
    const themeProps = useThemeProps(classes.player);

    const allAlbums = useMusic();
    const album = useAlbum(albumId);
    const track = useTrack(albumId,trackId);

    if ( !trackId || !albumId ) return null;

    return (
        <div {...themeProps}>
            <Flex className='p-0 m-0' h-100>
                <FlexItem col={4} style={{border: 'thin solid red'}}>
                    <Flex alignItems='center'>
                        <FlexItem col={2}>
                            <img loading='lazy' src={album?.photo ?? NO_ALBUM_ART_IMG} className={classes.image} />
                        </FlexItem>
                        <FlexItem col={9}>
                            <h6>{track?.title}</h6><br/>
                            <p>{album?.title}</p>
                        </FlexItem>
                    </Flex>
                </FlexItem>
                <FlexItem col={4}>
                    <Flex justifyContent='center' alignItems='center' gap={1} className='h-100'>
                        <IconButton className={classes.playerControl}>fast_rewind</IconButton>
                        <IconButton className={classes.playerControl} onClick={() => dispatch(setIsPlaying(!isPlaying))}>{isPlaying ? 'pause' : 'play_arrow'}</IconButton>
                        <IconButton className={classes.playerControl} onClick={fastForward}>fast_forward</IconButton>
                    </Flex>
                </FlexItem>
                <FlexItem col={4} style={{border: 'thin solid blue'}}>
                    volume
                </FlexItem>
            </Flex>
        </div>
    );

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
}