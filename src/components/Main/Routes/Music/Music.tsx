import { useRef, useEffect } from "react";

import { getMusic } from "src/redux/Music/thunks/getMusic";
import { useAppDispatch } from "src/redux/store";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useMusic } from "src/redux/Music/hook/useMusic";

import classes from './Music.module.scss';
import { Album } from "./Album/Album";
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from "src/components/shared/VerticalSpace";
import clsx from "clsx";
import { Player } from "./Player/Player";

export const Music = () => {
    useAppTitle('Music');

    const dispatch = useAppDispatch();

    const musicRef = useRef<HTMLDivElement | null>(null);

    const albums = useMusic();

    useEffect(() => {
        dispatch(getMusic());
    },[]);
    
    return (
        <>
            <Flex justifyContent="center" flexWrap="wrap" className={clsx(classes.music, 'px-2 px-md-4')}>
                <Flex justifyContent="center" flexWrap="wrap" className={classes.intro} gap={1}>
                    <FlexItem col={12} md={10}>
                        <h2>Music:</h2>
                    </FlexItem>
                    <FlexItem col={12}>
                        <hr className="px-5"/>
                    </FlexItem>
                </Flex>
                <Flex ref={musicRef} justifyContent="center" flexWrap="wrap" className={classes.albums} gap={5}>
                    <>
                        {albums.map((album,i) => (
                            <Album key={i} album={album} />
                        ))}
                    </>
                    {!!albums.length ? <BackToTop of={musicRef} /> : undefined}
                    <VerticalSpace height={'1px'} fill={true} />
                </Flex>
            </Flex>
            <Player />
        </>
    );
}
