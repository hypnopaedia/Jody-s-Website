import { useEffect, useRef } from "react";
import { useAppDispatch } from "src/redux/store";

import { BASE_ANIMATION_DELAY } from "./constants";
import { getPosts } from "src/redux/Home/thunks/getPosts";
import { setDidAnimationPlay } from "src/redux/Home/slice";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useDidAnimationPlay } from "src/redux/Home/hooks/useDidAnimationPlay";
import { useError } from "src/redux/Home/hooks/useError";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { usePosts } from "src/redux/Home/hooks/usePosts";

import clsx from "clsx";
import classes from './Home.module.scss';
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Error } from "src/components/shared/Error/Error";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Loading } from "src/components/shared/Loading/Loading";
import { Post } from "./Post/Post";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Home = () => {
    const postsRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();
    
    const posts = usePosts();
    const isLoading = useIsLoading();
    const error = useError();

    const didAnimationPlay = useDidAnimationPlay();

    useAppTitle();

    useEffect(() => {
        if ( !posts.length && !isLoading && !error ) dispatch(getPosts());
    },[]);

    useEffect(() => {
        if ( !didAnimationPlay ) {
            setTimeout(() => {
                dispatch(setDidAnimationPlay(true));
            }, BASE_ANIMATION_DELAY + 3000);
        }
    },[]);

    const renderedPosts = posts.map((post,i) => (
        <Post key={i} post={post} number={i}/>
    ));

    return (
        <Flex justifyContent="center" flexWrap="wrap" className={classes.home}>
            <FlexItem className={classes.intro}>
                <h6>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like, be on the lookout for hidden easter eggs and, please, scroll responsibly!
                </h6>
                <hr/>
            </FlexItem>

            <Flex ref={postsRef} justifyContent="md-start center" flexWrap="wrap" className={clsx(classes.posts, 'px-3', 'px-md-5', 'px-xxl-0')}>
                {isLoading
                    ? <Loading text="Loading Posts..." />
                    : !!error ? (
                        <Error />
                        ) : <>{renderedPosts}</>
                }
                <BackToTop of={postsRef} />
                <VerticalSpace height="15px" fill={true} />
            </Flex>
        </Flex>
    );
}
