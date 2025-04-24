import { useMemo } from "react";
import { useActiveAlbum } from "./useActiveAlbum";
import { usePlayer } from "../usePlayer"

export const useActiveTrack = () => {
    const { trackId } = usePlayer();
    const activeAlbum = useActiveAlbum();

    return useMemo(() => 
        activeAlbum?.tracks.find((track) => track.id === trackId)
    ,[trackId, activeAlbum]);
}
