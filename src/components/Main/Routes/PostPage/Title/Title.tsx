import { decode } from 'html-entities';
import { Link, useParams } from "react-router-dom"

import { getDate } from 'src/util/date';
import { PostPageParams } from "../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import { clsx } from 'clsx';
import classes from './Title.module.scss';
import { BackButton } from './BackButton/BackButton';
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem"
import { Flex } from "src/components/shared/Flex/Flex"
import { IconButton } from "src/components/shared/Button/IconButton"

export const Title = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    return (
        <>
            <FlexItem className={classes.title}>
                <Flex justifyContent='center' alignItems="center" gap={1}>
                    <h4>
                        {!!post?.title ? decode(post.title) : undefined}
                        {!!post?.url ? (
                            <Link to={post.url} target="_blank" rel="noopener noreferrer">
                                <IconButton className={classes.external}>arrow_outward</IconButton>
                            </Link>
                        ) : undefined}
                    </h4>
                    <BackButton />
                </Flex>
            </FlexItem>
            <FlexItem className={clsx(classes.date,'detail-text')}>
                {!!post?.date ? getDate(post.date) : undefined}
            </FlexItem>
            <FlexItem className={classes.titleHr}>
                <hr/>
            </FlexItem>
        </>
    );
}
