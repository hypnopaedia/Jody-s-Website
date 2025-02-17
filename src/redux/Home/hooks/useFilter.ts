import { useAppSelector } from "src/redux/store";

export const useFilter = () => useAppSelector((state) => state.Home.filter);
