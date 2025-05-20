import { useAppSelector } from "src/redux/store";

export const useIsListeningSessionLoading = () => useAppSelector((state) => state.Music.listeningSessionStatus.isLoading);
