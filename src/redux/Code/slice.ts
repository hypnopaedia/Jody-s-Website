import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project } from './types';

type CodeState = {
  projects: Project[],
  didAnimationPlay: boolean,
  isLoading: boolean,
  error: string | undefined,
}

const initialState: CodeState = { 
    projects: [], 
    didAnimationPlay: false,
    isLoading: false,
    error: undefined,
} satisfies CodeState as CodeState;

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setProjects(state, { payload: projects }: PayloadAction<Project[]>) {
      state.projects = projects;
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

export const { setProjects, setDidAnimationPlay, setIsLoading, setError } = codeSlice.actions;
export default codeSlice.reducer;
