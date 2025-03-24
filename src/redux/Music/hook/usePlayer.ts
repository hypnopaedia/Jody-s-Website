import { useAppSelector } from "src/redux/store";

export const usePlayer = () => useAppSelector((state) => state.Music.player);
