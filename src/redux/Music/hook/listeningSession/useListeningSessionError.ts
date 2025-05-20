import { useAppSelector } from "src/redux/store";

export const useListeningSessionError = () => useAppSelector((state) => state.Music.listeningSessionStatus.error);
