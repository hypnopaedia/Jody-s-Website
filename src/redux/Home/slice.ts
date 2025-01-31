import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from './types';

type HomeState = {
  posts: Post[],
  didAnimationPlay: boolean,
  isLoading: boolean,
  error: string | undefined,
}

const initialState: HomeState = { 
    posts: [], 
    didAnimationPlay: false,
    isLoading: false,
    error: undefined,
} satisfies HomeState as HomeState;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPosts(state, { payload: posts }: PayloadAction<Post[]>) {
      state.posts = posts;
    },
    setDidAnimationPlay(state, { payload: didAnimationPlay }: PayloadAction<boolean>) {
      state.didAnimationPlay = didAnimationPlay;
    },
    setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.isLoading = isLoading;
    },
    setError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.error = error;
    },
  },
})

export const { setPosts, setDidAnimationPlay, setIsLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;
