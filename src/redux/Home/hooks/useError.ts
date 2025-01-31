import { useAppSelector } from "src/redux/store";

export const useError = () => useAppSelector((state) => state.Home.error);
