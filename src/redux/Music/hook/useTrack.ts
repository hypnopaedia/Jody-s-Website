import { useAppSelector } from "src/redux/store";

export const useTrack = (albumId: number | undefined, trackId: number | undefined) => useAppSelector((state) => 
    state.Music.music
        .find((album) => album.id === albumId)
        ?.tracks
        .find((track) => track.id === trackId)
);
