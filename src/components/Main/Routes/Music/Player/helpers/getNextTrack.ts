import { Album, Track } from "src/redux/Music/types";

export const getNextTrack = (
    track: Track | undefined,
    album: Album,
    allAlbums: Album[]
) => {
    const lastTrackOfAlbum = album.tracks[album.tracks.length - 1];
    const lastAlbum = allAlbums[allAlbums.length - 1];

    if ( track?.id === lastTrackOfAlbum.id ) {
        if ( album.id === lastAlbum.id ) {
            return { 
                trackId: allAlbums[0].tracks[0].id, 
                albumId: allAlbums[0].id 
            };
        } else {
            const currentAlbumIndex = allAlbums.findIndex((a) => a.id === album.id);
            if ( currentAlbumIndex === -1 ) return;
            return {
                trackId: allAlbums[currentAlbumIndex+1].tracks[0].id, 
                albumId: allAlbums[currentAlbumIndex+1].id 
            };
        }
    } else {
        const currentTrackIndex = album.tracks.findIndex((t) => t.id === track?.id);
        return {
            trackId: album.tracks[currentTrackIndex + 1].id,
            albumId: album.id
        };
    }
}
