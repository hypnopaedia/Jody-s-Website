import { Dispatch } from "redux";
import { AxiosResponse } from "axios";

import { backend } from 'src/axios/config';

import { setMusic, setMusicError, setIsMusicLoading } from "../slice";
import { Album } from "../types";

export const getMusic = () =>
    async (dispatch: Dispatch) => {
        dispatch(setIsMusicLoading(true));
        try {
            const response: AxiosResponse<Album[]> = await backend.get('listening/music.php');
            dispatch(setMusic(response.data));

            // return for async-await purposes
            return response.data;
        } catch(e) {
            const error = `Failed to fetch Music: ${e}`;
            dispatch(setMusicError(error));
            throw error;
        } finally {
            dispatch(setIsMusicLoading(false));
        }
    }
