import { useMemo } from "react";

import { setFilter, setViewMode } from "src/redux/Home/slice";
import { useAppDispatch } from "src/redux/store";
import { useFilter } from "src/redux/Home/hooks/useFilter";
import { useResponsiveViewMode } from "src/redux/Home/hooks/useResponsiveViewMode";

import classes from './Intro.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { IconButton } from "src/components/shared/Button/IconButton";
import { SearchBar } from "src/components/shared/Input/SearchBar";

export const Intro = () => {
    const dispatch = useAppDispatch();
    const filter = useFilter();
    const viewMode = useResponsiveViewMode();

    const controlsFlexColumns = useMemo(() => (
        (viewMode === 'Tile' ? { xxl: 10, xl: 10, lg: 10, md: 10, col: 9 } : { md: 11, xl: 9, xxl: 8 })
    ),[viewMode]);

    return (
        <>
            <FlexItem className={classes.intro}>
                <h6>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like{' '}
                    {/* , be on the lookout for hidden easter eggs  */}
                    and, please, scroll responsibly!
                </h6>
                <hr/>
            </FlexItem>
            <FlexItem {...controlsFlexColumns} padding={0}>
                <Flex alignItems="center" padding={0}>
                    <FlexItem col={1} padding={0} >
                        {/* <h5 className={classes.title}>Posts:</h5> */}
                    </FlexItem>
                    <FlexItem col={11} padding={0} >
                        <Flex alignItems="center" justifyContent="end" gap={1} className="py-1" padding={0}>
                            <SearchBar value={filter} onChange={(e) => dispatch(setFilter(e))} placeholder="Filter Posts"/>
                            <IconButton onClick={() => dispatch(setViewMode('Tile'))}>grid_view</IconButton>
                            <IconButton onClick={() => dispatch(setViewMode('List'))}>list</IconButton>
                        </Flex>
                    </FlexItem>
                </Flex>
            </FlexItem>
        </>
    );
}
