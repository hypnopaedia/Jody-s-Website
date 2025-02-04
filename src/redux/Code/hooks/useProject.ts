import { useAppSelector } from "src/redux/store";

export const useProject = (id: number) => useAppSelector((state) => {
    return state.Code.projects?.[id] ?? undefined;
});
