import { decode } from 'html-entities';
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { usePost } from "src/redux/Home/hooks/usePost";
import { useIsLoading } from "src/redux/Home/hooks/useIsLoading";
import { useError } from "src/redux/Home/hooks/useError";
import { getPosts } from "src/redux/Home/thunks/getPosts";
import { PostPageParams } from "./types";
import { useAppDispatch } from "src/redux/store";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import classes from './PostPage.module.scss';
import { applyMarkdown } from 'src/util/applyMarkdown';
import { Controls } from './Controls/Controls';
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

export const PostPage = () => {
    const dispatch = useAppDispatch();
    const params = useParams<PostPageParams>();

    const post = usePost(Number(params.id));
    const isLoading = useIsLoading();
    const error = useError();

    useEffect(() => {
        if ( !post && !isLoading && !error ) dispatch(getPosts());
    },[]);

    if ( error || (!post && !isLoading && !error)) return <p>Uh-oh! Something went wrong :[ </p>;
    if ( isLoading ) return <p>Loading...</p>;

    const mainContent = !!post.embed ? (
        <div dangerouslySetInnerHTML={{__html: post.embed}}></div>
    ) : (
        <img src={post.photo} alt="main content" />
    );

    return (
        <>
            <Flex justifyContent='center' alignContent='flex-start' flexWrap='wrap' className={classes.postPage}>
                <Controls />

                <FlexItem width="100%">
                    <h2>{post.title}</h2>
                </FlexItem>
                <FlexItem width="100%">
                    <hr/>
                </FlexItem>

                <FlexItem width="100%" className={classes.postContent}>
                    <Flex justifyContent="center" flexWrap='wrap'>
                        <FlexItem width='100%' className={classes.mainContent}>
                            <Flex justifyContent="center" flexWrap='wrap'>
                                {mainContent}
                            </Flex>
                        </FlexItem>
                        <FlexItem width="100%">
                            <div className={classes.description}>
                                {applyMarkdown(post.description)}
                            </div>
                        </FlexItem>
                    </Flex>

                    <FlexItem width="100%">
                        <VerticalSpace height='35px' fill={true} />
                    </FlexItem>
                </FlexItem>
            </Flex>
        </>
    )
}