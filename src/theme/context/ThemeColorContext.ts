import { createContext } from "react";
import { ThemeColor } from "../types";

export const ThemeColorContext = createContext<ThemeColor>('primary');
