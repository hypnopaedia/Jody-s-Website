import { useAppSelector } from "src/redux/store";
import { Post } from "../types";

export const usePost: (id: number) => Post | undefined = (id: number) => useAppSelector((state) => {
    return state.Home.posts?.[id] ?? undefined;
});
