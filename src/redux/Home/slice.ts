import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from './types';

type HomeState = {
  posts: Post[],
  isLoading: boolean,
  error: string | undefined,
}

const initialState: HomeState = { 
    posts: [], 
    isLoading: false,
    error: undefined,
} satisfies HomeState as HomeState;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPosts(state, { payload: posts }: PayloadAction<Post[]>) {
      console.log(posts)
      state.posts = posts;
    },
    setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.isLoading = isLoading;
    },
    setError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.error = error;
    },
  },
})

export const { setPosts, setIsLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;
