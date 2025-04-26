import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Album, ListeningSession, Player } from './types';
import { DEFAULT_PLAYER } from './constants';

type MusicState = {
  listeningSession: ListeningSession | undefined,
  music: Album[],
  player: Player,

  didAnimationPlay: boolean,

  isLoading: boolean,
  error: string | undefined,
}

const initialState: MusicState = { 
    listeningSession: undefined, 
    music: [],
    player: DEFAULT_PLAYER,

    didAnimationPlay: false,

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
      state.player.lastStartTime = 0;
    },
    setIsPlaying(state,{ payload: isPlaying }: PayloadAction<boolean>) {
      state.player.isPlaying = isPlaying;
    },
    toggleIsPlaying(state) {
      state.player.isPlaying = !state.player.isPlaying;
    },
    setLastStartTime(state, { payload }: PayloadAction<number | undefined>) {
      state.player.lastStartTime = payload;
    },
    setVolume(state, { payload }: PayloadAction<number>) {
      state.player.volume = payload;
      localStorage['volume'] = payload;
    },
    setIsMuted(state, { payload }: PayloadAction<boolean>) {
      state.player.isMuted = payload;
      localStorage['isMuted'] = payload;
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

export const { 
  setListeningSession, 
  
  setMusic, 
  setPlayerTrack,
  
  setIsPlaying,
  toggleIsPlaying,
  setLastStartTime,
  
  setVolume,
  setIsMuted,

  setDidAnimationPlay,
  
  setIsLoading, 
  setError
} = musicSlice.actions;
export default musicSlice.reducer;
