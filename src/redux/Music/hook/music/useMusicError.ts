import { useAppSelector } from "src/redux/store";

export const useMusicError = () => useAppSelector((state) => state.Music.musicStatus.error);
