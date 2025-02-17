import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post, ViewMode } from './types';

type HomeState = {
  posts: Post[],
  isLoading: boolean,
  error: string | undefined,

  didAnimationPlay: boolean,
  filter: string | undefined,
  viewMode: ViewMode,
}

const initialState: HomeState = { 
    posts: [], 
    isLoading: false,
    error: undefined,

    didAnimationPlay: false,
    filter: '',
    viewMode: localStorage['viewMode'] ?? 'List',
} satisfies HomeState as HomeState;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPosts(state, { payload: posts }: PayloadAction<Post[]>) {
      state.posts = posts;
    },
    setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.isLoading = isLoading;
    },
    setError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.error = error;
    },

    setDidAnimationPlay(state, { payload: didAnimationPlay }: PayloadAction<boolean>) {
      state.didAnimationPlay = didAnimationPlay;
    },
    setFilter(state, { payload: filter }: PayloadAction<string | undefined>) {
      state.filter = filter;
    },
    setViewMode(state, { payload: viewMode }: PayloadAction<ViewMode>) {
      state.viewMode = viewMode;
      localStorage['viewMode'] = viewMode;
    }
  },
})

export const { 
  setPosts, 
  setIsLoading, 
  setError, 
  
  setDidAnimationPlay, 
  setFilter,
  setViewMode
} = homeSlice.actions;

export default homeSlice.reducer;
