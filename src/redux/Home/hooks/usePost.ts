import { useAppSelector } from "src/redux/store";

export const usePost = (id: number) => useAppSelector((state) => {
    return state.Home.posts?.[id] ?? undefined;
});
