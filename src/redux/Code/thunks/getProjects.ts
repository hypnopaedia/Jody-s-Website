import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { backend } from 'src/axios/config';

import { setError, setIsLoading, setProjects } from "../slice";
import { Project } from "../types";

export const getProjects = () => 
    async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        try {
            backend.get('projects.php').then((res: AxiosResponse<Project[]>) => {
                dispatch(setProjects(res.data));
            });
        } catch(e) {
            const error = `Failed to fetch Projects: ${e}`;
            dispatch(setError(error));
            throw error;
        } finally {
            dispatch(setIsLoading(false));
        }
    };
