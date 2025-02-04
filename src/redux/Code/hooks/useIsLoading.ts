import { useAppSelector } from "src/redux/store";

export const useIsLoading = () => useAppSelector((state) => state.Code.isLoading);
