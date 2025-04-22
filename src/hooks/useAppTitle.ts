import { decode } from 'html-entities';
import { useEffect } from "react"

const APP_BASE_TITLE = "Jody's Website";

export const useAppTitle = (title?: string) => {
    useEffect(() => {
        if ( !!title?.length ) document.title = decode(`${title} | ${APP_BASE_TITLE}`);
        else document.title = decode(APP_BASE_TITLE);
    },[title]);
}
