import { useLayoutEffect, useState } from "react";
import { useViewMode } from "./useViewMode"
import { MD_BREAKPOINT } from "src/util/breakpoints";
import { ViewMode } from "../types";

export const useResponsiveViewMode = (): ViewMode => {
    const viewMode = useViewMode();
    const [overrideViewMode, setOverrideViewMode] = useState<boolean>(false);

    useLayoutEffect(() => {
        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    },[overrideViewMode]);

    if ( overrideViewMode ) return 'Tile';
    return viewMode;

    function resizeListener() {
        if ( window.innerWidth <= MD_BREAKPOINT ) {
            if ( !overrideViewMode ) setOverrideViewMode(true); 
        } else {
            if ( overrideViewMode ) setOverrideViewMode(false);
        }
    }
}