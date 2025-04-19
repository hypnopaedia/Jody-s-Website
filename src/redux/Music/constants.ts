import { Player } from "./types";

export const DEFAULT_PLAYER: Player = {
    albumId: undefined,
    trackId: undefined,

    isPlaying: false,
    lastStartTime: undefined,
    
    volume: localStorage['volume'] ?? 1,
    isMuted: localStorage['isMuted'] === "true",
};
