import { useAppSelector } from "src/redux/store";

export const useIsMusicLoading = () => useAppSelector((state) => state.Music.musicStatus.isLoading);
