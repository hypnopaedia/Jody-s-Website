import { ThemeColor } from "../types";

export const getReverseThemeColor = (theme: ThemeColor): ThemeColor => theme === 'primary' ? 'secondary' : 'primary';
