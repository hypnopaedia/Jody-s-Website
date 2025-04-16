import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Album, ListeningSession, Player } from './types';
import { DEFAULT_PLAYER } from './constants';

type MusicState = {
  listeningSession: ListeningSession | undefined,
  music: Album[],
  player: Player,
  isLoading: boolean,
  error: string | undefined,
}

const initialState: MusicState = { 
    listeningSession: undefined, 
    music: [],
    player: DEFAULT_PLAYER,
    isLoading: false,
    error: undefined,
} satisfies MusicState as MusicState;

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setListeningSession(state, { payload: listeningSession }: PayloadAction<ListeningSession | undefined>) {
      state.listeningSession = listeningSession;
    },
    setMusic(state, { payload: albums }: PayloadAction<Album[]>) {
      state.music = albums;
    },
    setPlayerTrack(state, { payload }: PayloadAction<Pick<Player, 'trackId' | 'albumId'>>) {
      state.player.albumId = payload.albumId;
      state.player.trackId = payload.trackId;
      state.player.isPlaying = true;
      state.player.currentTime = 0;
      state.player.duration = 0;
    },
    setIsPlaying(state,{ payload: isPlaying }: PayloadAction<boolean>) {
      state.player.isPlaying = isPlaying;
    },
    toggleIsPlaying(state) {
      state.player.isPlaying = !state.player.isPlaying;
    },
    setCurrentTime(state, { payload }: PayloadAction<number | undefined>) {
      state.player.currentTime = payload;
    },
    setDuration(state, { payload }: PayloadAction<number | undefined>) {
      state.player.duration = payload;
    },
    setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.isLoading = isLoading;
    },
    setError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.error = error;
    },
  },
})

export const { 
  setListeningSession, 
  setMusic, 
  setPlayerTrack,
  setIsPlaying,
  toggleIsPlaying,
  setCurrentTime,
  setDuration,
  setIsLoading, 
  setError
} = musicSlice.actions;
export default musicSlice.reducer;
