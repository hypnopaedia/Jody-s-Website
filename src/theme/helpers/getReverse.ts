import { Theme } from "../types";

export const getReverse = (theme: Theme): Theme => theme === 'primary' ? 'secondary' : 'primary';
