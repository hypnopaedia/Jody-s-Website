import { useAppSelector } from "src/redux/store";

export const useAlbum = (albumId: number | undefined) => useAppSelector((state) => 
    state.Music.music.find((album) => album.id === albumId));
