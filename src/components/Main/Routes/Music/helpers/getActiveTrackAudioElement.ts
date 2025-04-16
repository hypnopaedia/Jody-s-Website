import { getAudioElementId } from "./getAudioElementId";

export const getActiveTrackAudioElement = (trackId: number | undefined, albumId: number | undefined) => 
    document.getElementById(getAudioElementId(trackId, albumId)) as HTMLAudioElement | null;