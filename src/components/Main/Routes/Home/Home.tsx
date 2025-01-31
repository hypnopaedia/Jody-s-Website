import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import classes from './Home.module.scss';
import { useEffect, useState } from "react";
import { backend } from "src/axios/config"; 
import { Post } from "../../../../redux/Home/types";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "src/redux/store";
import { usePosts } from "src/redux/Home/hooks/usePosts";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { useError } from "src/redux/Home/hooks/useError";
import { getPosts } from "src/redux/Home/thunks/getPosts";

export const Home = () => {

    const dispatch = useAppDispatch();

    const posts = usePosts();
    const isLoading = useIsLoading();
    const error = useError();

    useEffect(() => {
        if ( !posts.length && !isLoading && !error ) dispatch(getPosts());
    },[]);

    return (
        <Flex justifyContent="center" flexWrap="wrap" className={classes.home}>
            <FlexItem width={'100%'}>
                <h5 className={classes.intro}>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like, be on the lookout for hidden easter eggs and, please, scroll responsibly!
                </h5>
                <hr/>
            </FlexItem>

            <FlexItem width='20%'>
                {isLoading 
                    ? <Flex justifyContent="center"><p>Loading...</p></Flex>
                    : posts.map((post,i) => (
                        <p key={i}>{post.title}</p>
                    ))
                }
            </FlexItem>
        </Flex>
    );
}
