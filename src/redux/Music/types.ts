import { Dayjs } from "dayjs"

export type ListeningSession = {
    uuid: string,
    created: Dayjs,
}

export type Player = {
    albumId: number | undefined,
    trackId: number | undefined,

    isPlaying: boolean,
    lastStartTime: number | undefined,

    volume: number,
    isMuted: boolean,
}

export type Album = {
    id: number,
    title: string,
    date: Dayjs,
    photo: string,
    genre: string,
    tracks: Track[], 
}

export type Track = {
    id: number,
    title: string,
    url: string,
    trackNo: number,
    duration: number,
}
