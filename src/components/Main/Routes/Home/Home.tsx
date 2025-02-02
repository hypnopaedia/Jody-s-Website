import { useEffect } from "react";
import { useAppDispatch } from "src/redux/store";

import { getPosts } from "src/redux/Home/thunks/getPosts";
import { usePosts } from "src/redux/Home/hooks/usePosts";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { useError } from "src/redux/Home/hooks/useError";

import classes from './Home.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Post } from "./Post/Post";
import { BASE_ANIMATION_DELAY } from "./constants";
import { useDidAnimationPlay } from "src/redux/Home/hooks/useDidAnimationPlay";
import { setDidAnimationPlay } from "src/redux/Home/slice";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Home = () => {
    const dispatch = useAppDispatch();
    
    const posts = usePosts();
    const isLoading = useIsLoading();
    const error = useError();

    const didAnimationPlay = useDidAnimationPlay();

    useEffect(() => {
        if ( !posts.length && !isLoading && !error ) dispatch(getPosts());
    },[]);

    useEffect(() => {
        if ( !didAnimationPlay ) {
            setTimeout(() => {
                dispatch(setDidAnimationPlay(true));
            }, BASE_ANIMATION_DELAY + 2000);
        }
    },[]);

    const renderedPosts = posts.map((post,i) => (
        <Post key={i} post={post} number={i}/>
    ));

    return (
        <Flex justifyContent="center" flexWrap="wrap" className={classes.home}>
            <FlexItem width={'100%'} className={classes.intro}>
                <h6>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like, be on the lookout for hidden easter eggs and, please, scroll responsibly!
                </h6>
                <hr/>
            </FlexItem>

            <Flex justifyContent="center" flexWrap="wrap" className={classes.posts}>
                {isLoading 
                    ? <p>Loading...</p>
                    : <>{renderedPosts}</>
                }
                <VerticalSpace height="50px" fill={true} />
            </Flex>
        </Flex>
    );
}
