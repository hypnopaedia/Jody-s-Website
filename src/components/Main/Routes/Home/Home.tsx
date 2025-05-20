import { useEffect, useRef } from "react";
import { useAppDispatch } from "src/redux/store";

import { getPosts } from "src/redux/Home/thunks/getPosts";
import { ROUTE_HEADER_ANIMATION_DELAY } from "../../constants";
import { setDidAnimationPlay } from "src/redux/Home/slice";

import { useAppTitle } from "src/hooks/useAppTitle";
import { useDidAnimationPlay } from "src/redux/Home/hooks/useDidAnimationPlay";
import { useError } from "src/redux/Home/hooks/useError";
import { useFilteredPosts } from "src/redux/Home/hooks/useFilteredPosts";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { useResponsiveViewMode } from "src/redux/Home/hooks/useResponsiveViewMode";

import clsx from "clsx";
import classes from './Home.module.scss';
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Error } from "src/components/shared/Error/Error";
import { Flex } from "src/components/shared/Flex/Flex";
import { Intro } from "./Intro/Intro";
import { Loading } from "src/components/shared/Loading/Loading";
import { Posts } from "./Posts/Posts";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Home = () => {
    const dispatch = useAppDispatch();

    const postsRef = useRef<HTMLDivElement | null>(null);
    
    const posts = useFilteredPosts();
    const isLoading = useIsLoading();
    const error = useError();

    const viewMode = useResponsiveViewMode();

    useAppTitle();

    useEffect(() => {
        if ( !posts.length && !isLoading && !error ) dispatch(getPosts());
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
        <Flex justifyContent="center" flexWrap="wrap" className={classes.home}>
            <Intro />
            <Flex ref={postsRef} justifyContent="md-start center" flexWrap="wrap" 
                    className={clsx(classes.posts, 
                        'px-3', 'px-md-5', 'px-xxl-0',
                        ...((viewMode === 'List') ? ['row-gap-4', 'py-3'] : [])
                    )}>
                {isLoading
                    ? <Loading text="Loading Posts..." />
                    : !!error 
                        ? <Error />
                        : <Posts />
                }
                {!!posts.length ? <BackToTop of={postsRef} /> : undefined}
                <VerticalSpace height={viewMode === 'Tile' ? '35px' : '5px'} fill={true} />
            </Flex>
        </Flex>
    );
}
