import { useEffect } from "react";
import { useParams } from "react-router-dom"

import { getPosts } from "src/redux/Home/thunks/getPosts";
import { PostPageParams } from "./types";
import { useAppDispatch } from "src/redux/store";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { useError } from "src/redux/Home/hooks/useError";
import { usePost } from "src/redux/Home/hooks/usePost";

import clsx from "clsx";
import classes from './PostPage.module.scss';
import { ANIMATION_CLASSES } from "src/theme/constants";
import { Body } from "./Body/Body";
import { Error } from "src/components/shared/Error/Error";
import { Flex } from "src/components/shared/Flex/Flex";
import { Title } from "./Title/Title";

export const PostPage = () => {
    const dispatch = useAppDispatch();
    const params = useParams<PostPageParams>();

    const post = usePost(Number(params.id));
    const isLoading = useIsLoading();
    const error = useError();

    useAppTitle(post?.title);

    useEffect(() => {
        if ( !post && !isLoading && !error ) dispatch(getPosts());
    },
    // @ts-ignore: initial page load only, don't include deps
    []);

    if ( error || (!post && !isLoading && !error) || isNaN(Number(params.id)) ) return <Error />;
    if ( isLoading ) return <p>Loading...</p>;

    return (
        <Flex 
            justifyContent='center' 
            alignContent='flex-start' 
            flexWrap='wrap' 
            className={clsx(classes.postPage, ANIMATION_CLASSES.fadeInFromRight, 'px-4')}
        >
            <Title />
            <Body />
        </Flex>
    )
}
