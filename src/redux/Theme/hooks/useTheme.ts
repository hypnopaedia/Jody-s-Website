import { useAppSelector } from "src/redux/store";
import { Theme } from "src/theme/types";

export const useTheme: () => Theme = () => useAppSelector((state) => state.Theme.theme);
