import { useAppSelector } from "src/redux/store";

export const useListeningSession = () => useAppSelector((state) => state.Music.listeningSession);
