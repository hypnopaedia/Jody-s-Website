import { useMemo } from "react";
import { usePlayer } from "src/redux/Music/hook/usePlayer"

export const useIsActiveTrack = (trackId: number, albumId: number) => {
    const { trackId: playerTrackId, albumId: playerAlbumId } = usePlayer();
    
    return useMemo(() => (
        trackId === playerTrackId && albumId === playerAlbumId
    ),[trackId, albumId, playerTrackId, playerAlbumId]);
}