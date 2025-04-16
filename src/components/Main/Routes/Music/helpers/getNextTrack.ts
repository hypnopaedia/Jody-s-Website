import { Album, Player, Track } from "src/redux/Music/types";

export const getNextTrack = (
    currentAlbum: Album | undefined,
    currentTrack: Track | undefined,
    allAlbums: Album[] | undefined
): Pick<Player, 'trackId' | 'albumId'> => {
    if ( !currentAlbum?.tracks || !currentTrack || !allAlbums ) return { trackId: undefined, albumId: undefined };

    const lastTrackOfAlbum = currentAlbum.tracks[currentAlbum.tracks.length - 1];
    const lastAlbum = allAlbums[allAlbums.length - 1];

    if ( currentTrack?.id === lastTrackOfAlbum.id ) {
        if ( currentAlbum.id === lastAlbum.id ) {
            return { trackId: allAlbums[0].tracks[0].id, albumId: allAlbums[0].id };
        } else {
            const currentAlbumIndex = allAlbums.findIndex((a) => a.id === currentAlbum.id);
            if ( currentAlbumIndex === -1 ) return { trackId: undefined, albumId: undefined };;
            return { 
                trackId: allAlbums[currentAlbumIndex+1].tracks[0].id, 
                albumId: allAlbums[currentAlbumIndex+1].id 
            };
        }
    }
    
    const currentTrackIndex = currentAlbum.tracks.findIndex((t) => t.id === currentTrack.id);
    return {
        trackId: currentAlbum.tracks[currentTrackIndex + 1].id,
        albumId: currentAlbum.id
    };
}
