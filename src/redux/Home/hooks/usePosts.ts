import { useAppSelector } from "src/redux/store";

export const usePosts = () => useAppSelector((state) => state.Home.posts);
