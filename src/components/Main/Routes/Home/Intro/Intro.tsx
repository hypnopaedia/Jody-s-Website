import { useLayoutEffect, useMemo, useState } from "react";

import { setFilter, setViewMode } from "src/redux/Home/slice";

import { useAppDispatch } from "src/redux/store";
import { useDidAnimationPlay } from "src/redux/Home/hooks/useDidAnimationPlay";
import { useFilter } from "src/redux/Home/hooks/useFilter";
import { useResponsiveViewMode } from "src/redux/Home/hooks/useResponsiveViewMode";

import classes from './Intro.module.scss';
import clsx from "clsx";
import { ANIMATION_CLASSES } from "src/theme/constants";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { IconButton } from "src/components/shared/Button/IconButton";
import { SearchBar } from "src/components/shared/Input/SearchBar";
import { MD_BREAKPOINT } from "src/util/breakpoints";

export const Intro = () => {
    const dispatch = useAppDispatch();

    const didAnimationPlay = useDidAnimationPlay();
    const filter = useFilter();
    const [showViewModes,setShowViewModes] = useState(window.innerWidth > MD_BREAKPOINT);
    const viewMode = useResponsiveViewMode();

    const controlsFlexColumns = useMemo(() => viewMode === 'Tile' ? (
        { xxl: 10, xl: 10, lg: 10, md: 10, col: 9 }
    ) : (
        { xxl:  8, xl:  9, md: 11 }
    ),[viewMode]);

    useLayoutEffect(() => {
        window.addEventListener('resize', displayViewModes);
        return () => window.removeEventListener('resize', displayViewModes);
    },[showViewModes]);

    return (
        <>
            <FlexItem className={clsx(classes.intro, !didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight)}>
                <h6>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like{' '}
                    {/* , be on the lookout for hidden easter eggs  */}
                    and, please, scroll responsibly!
                </h6>
                <hr/>
            </FlexItem>
            <FlexItem 
                {...controlsFlexColumns} 
                padding={0} 
                className={clsx(classes.controls, !didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight)}
            >
                <Flex alignItems="center" padding={0}>
                    <FlexItem col={12} padding={0} >
                        <Flex alignItems="center" justifyContent={showViewModes ? "end" : "center"} gap={1} className="py-1" padding={0}>
                            <SearchBar value={filter} onChange={(e) => dispatch(setFilter(e))} placeholder="Filter Posts"/>
                            {showViewModes ? (
                                <>
                                    <IconButton onClick={() => dispatch(setViewMode('Tile'))}>grid_view</IconButton>
                                    <IconButton onClick={() => dispatch(setViewMode('List'))}>list</IconButton>
                                </>
                            ) : undefined}
                        </Flex>
                    </FlexItem>
                </Flex>
            </FlexItem>
        </>
    );

    function displayViewModes() {
        setShowViewModes(window.innerWidth > MD_BREAKPOINT);
    }
}
