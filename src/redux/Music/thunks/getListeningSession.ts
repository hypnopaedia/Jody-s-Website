import { Dispatch } from "redux";
import { AxiosResponse } from "axios";

import { backend } from 'src/axios/config';

import { setListeningSession, setIsListeningSessionLoading, setListeningSessionError } from "../slice";
import { ListeningSession } from "../types";

export const getListeningSession = () =>
    async (dispatch: Dispatch) => {
        dispatch(setIsListeningSessionLoading(true));
        try {
            const response: AxiosResponse<ListeningSession | undefined> = await backend.get('listening/sessionStart.php');
            dispatch(setListeningSession(response.data));

            // return for async-await purposes
            return response.data;
        } catch(e) {
            const error = `Failed to fetch Listening Session: ${e}`;
            dispatch(setListeningSessionError(error));
            throw error;
        } finally {
            dispatch(setIsListeningSessionLoading(false));
        }
    }
