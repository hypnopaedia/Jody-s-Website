import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Album, ListeningSession, Player } from './types';
import { DEFAULT_PLAYER } from './constants';
import { RouteSlice, ThunkStatus } from '../types';

type MusicState = Omit<RouteSlice, keyof ThunkStatus> & {
  listeningSession: ListeningSession | undefined,
  listeningSessionStatus: ThunkStatus,

  music: Album[],
  musicStatus: ThunkStatus,

  player: Player,
}

const initialState: MusicState = { 
    listeningSession: undefined, 
    listeningSessionStatus: {
      isLoading: false,
      error: undefined
    },

    music: [],
    musicStatus: {
      isLoading: false,
      error: undefined,
    },

    player: DEFAULT_PLAYER,

    didAnimationPlay: false,
} satisfies MusicState as MusicState;

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setListeningSession(state, { payload: listeningSession }: PayloadAction<ListeningSession | undefined>) {
      state.listeningSession = listeningSession;
    },
      setIsListeningSessionLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.listeningSessionStatus.isLoading = isLoading;
      },
      setListeningSessionError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.listeningSessionStatus.error = error;
      },
    setMusic(state, { payload: albums }: PayloadAction<Album[]>) {
      state.music = albums;
    },
      setIsMusicLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
        state.musicStatus.isLoading = isLoading;
      },
      setMusicError(state, { payload: error }: PayloadAction<string | undefined>) {
        state.musicStatus.error = error;
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
  },
})

export const { 
  setListeningSession, 
  setIsListeningSessionLoading,
  setListeningSessionError,
  
  setMusic, 
  setIsMusicLoading,
  setMusicError,

  setPlayerTrack,
  
  setIsPlaying,
  toggleIsPlaying,
  setLastStartTime,
  
  setVolume,
  setIsMuted,

  setDidAnimationPlay,
} = musicSlice.actions;
export default musicSlice.reducer;
