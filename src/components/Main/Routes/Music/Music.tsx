import { useRef, useEffect } from "react";

import { getMusic } from "src/redux/Music/thunks/getMusic";
import { ROUTE_HEADER_ANIMATION_DELAY } from "../../constants";
import { setDidAnimationPlay } from "src/redux/Music/slice";

import { useAppDispatch } from "src/redux/store";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useDidAnimationPlay } from "src/redux/Music/hook/useDidAnimationPlay";
import { useIsLoading } from "src/redux/Music/hook/useIsLoading";
import { useError } from "src/redux/Music/hook/useError";
import { useMusic } from "src/redux/Music/hook/useMusic";

import clsx from "clsx";
import classes from './Music.module.scss';
import { Album } from "./Album/Album";
import { ANIMATION_CLASSES } from "src/theme/constants";
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Player } from "./Player/Player";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Music = () => {
    useAppTitle('Music');

    const dispatch = useAppDispatch();

    const musicRef = useRef<HTMLDivElement | null>(null);

    const albums = useMusic();
    const isLoading = useIsLoading();
    const error = useError();

    useEffect(() => {
        if ( !albums.length && !isLoading && !error ) dispatch(getMusic());
    },[]);

    const didAnimationPlay = useDidAnimationPlay();

    useEffect(() => {
        if ( !didAnimationPlay ) {
            setTimeout(() => {
                dispatch(setDidAnimationPlay(true));
            }, ROUTE_HEADER_ANIMATION_DELAY);
        }
    },[]);
    
    return (
        <>
            <Flex justifyContent="center" flexWrap="wrap" className={clsx(classes.music, 'px-2 px-md-4')}>
                <Flex justifyContent="center" flexWrap="wrap" className={classes.intro} gap={1}>
                    <FlexItem col={12} md={10}>
                        <h2 className={clsx(!didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight)}>Music:</h2>
                        <p className={clsx(classes.disclaimer, !didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight)}>
                            I've written music for films, games, rappers, bands, and more. It's getting to the point that it's kind of hard to catalogue!<br/>
                            {/* Below is a rudimentary first attempt at my own personal streaming service. */}
                            P.S. My scoring to picture work isn't included here yet, you can check out my{' '}
                            <a href="https://www.youtube.com/channel/UCRW4VQPoZNZHpsa3R4iqqjA?view_as=subscriber" target="_blank" rel="noopener noreferrer">YouTube</a>{' '}
                            channel for that for now.<br/>
                            P.S.S. Don't forget to check out my old prog-rock group{' '}
                            <a href="https://shyphilly.bandcamp.com/album/shy" target="_blank" rel="noopener noreferrer">Shy</a>.
                        </p>
                    </FlexItem>
                    <FlexItem col={12}>
                        <hr className="px-5"/>
                    </FlexItem>
                </Flex>
                <Flex ref={musicRef} justifyContent="center" flexWrap="wrap" className={classes.albums} gap={5}>
                    <>
                        {!!albums.length ? (
                            albums.map((album,i) => (
                                <Album key={i} album={album} number={i} />
                            ))
                        ) : (
                            'No Music Found :('
                        )}
                    </>
                    {!!albums.length ? <BackToTop of={musicRef} /> : undefined}
                    <VerticalSpace height={'1px'} fill={true} />
                </Flex>
            </Flex>
            <Player />
        </>
    );
}
