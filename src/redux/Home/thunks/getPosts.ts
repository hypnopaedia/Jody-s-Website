import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { backend } from 'src/axios/config';

import { setError, setIsLoading, setPosts } from "../slice";
import { Post } from "../types";

export const getPosts = () => 
    async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        try {
            const response: AxiosResponse<Post[]> = await backend.get('posts.php');
            dispatch(setPosts(response.data));
        } catch(e) {
            const error = `Failed to fetch Posts: ${e}`;
            dispatch(setError(error));
            throw error;
        } finally {
            dispatch(setIsLoading(false));
        }
    };