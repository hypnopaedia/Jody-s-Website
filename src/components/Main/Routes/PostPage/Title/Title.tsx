import { decode } from 'html-entities';
import { Link, useParams } from "react-router-dom"

import { PostPageParams } from "../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import classes from './Title.module.scss';
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem"
import { Flex } from "src/components/shared/Flex/Flex"
import { IconButton } from "src/components/shared/Button/IconButton"

export const Title = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    return (
        <>
            <FlexItem width="100%">
                <Flex justifyContent='center' alignItems="center" gap="8px">
                    <h2>{decode(post.title)}</h2>
                    {!!post.url ? (
                        <Link to={post.url} target="_blank" rel="noopener noreferrer">
                            <IconButton className={classes.external}>arrow_outward</IconButton>
                        </Link>
                    ) : undefined}
                </Flex>
            </FlexItem>
            <FlexItem width="100%">
                <hr/>
            </FlexItem>
        </>
    );
}
