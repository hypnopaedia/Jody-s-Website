import { useMemo } from "react";
import { useMusic } from "../music/useMusic";
import { usePlayer } from "../usePlayer"

export const useActiveAlbum = () => {
    const { albumId } = usePlayer();
    const albums = useMusic();

    return useMemo(() => 
        albums.find((album) => album.id === albumId)
    ,[albumId, albumId]);
}