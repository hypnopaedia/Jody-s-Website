import { useAppSelector } from "src/redux/store";

export const useDidAnimationPlay = () => useAppSelector((state) => state.Music.didAnimationPlay);
