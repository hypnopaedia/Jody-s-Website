import { useEffect } from "react"

const APP_BASE_TITLE = "Jody's Website";

export const useAppTitle = (title?: string) => {
    return useEffect(() => {
        if ( !!title?.length ) document.title = `${title} | ${APP_BASE_TITLE}`;
        else document.title = APP_BASE_TITLE;
    },[title]);
}
