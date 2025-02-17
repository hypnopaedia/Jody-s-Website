import { useAppSelector } from "src/redux/store";

export const useViewMode = () => useAppSelector((state) => state.Home.viewMode);
