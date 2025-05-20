import { useAppSelector } from "src/redux/store";

export const useMusic = () => useAppSelector((state) => state.Music.music);
