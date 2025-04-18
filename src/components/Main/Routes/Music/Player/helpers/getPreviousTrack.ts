import { Album, Track } from "src/redux/Music/types";

export const getPreviousTrack = (
    track: Track | undefined,
    album: Album,
    allAlbums: Album[],
) => {
    const firstTrackOfAlbum = album.tracks[0];
    const firstAlbum = allAlbums[0];

    if ( track?.id === firstTrackOfAlbum.id ) {
        if ( album.id === firstAlbum.id ) {
            return undefined;
        } else {
            const currentAlbumIndex = allAlbums.findIndex((a) => a.id === album.id);
            if ( currentAlbumIndex === -1 ) return;

            const previousAlbum = allAlbums[currentAlbumIndex-1];

            return { 
                trackId: previousAlbum.tracks[previousAlbum.tracks.length-1].id, 
                albumId: previousAlbum.id 
            };
        }
    } else {
        const currentTrackIndex = album.tracks.findIndex((t) => t.id === track?.id);
        return {
            trackId: album.tracks[currentTrackIndex - 1].id,
            albumId: album.id
        };
    }
}
