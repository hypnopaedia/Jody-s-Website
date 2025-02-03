import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Theme } from 'src/theme/types';

type ThemeState = {
  theme: Theme,
}

const initialState: ThemeState = { 
    theme: localStorage['theme'] ?? 'light',
} satisfies ThemeState as ThemeState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload: theme }: PayloadAction<Theme>) {
        state.theme = theme;
        localStorage['theme'] = theme;
    },
  },
})

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
