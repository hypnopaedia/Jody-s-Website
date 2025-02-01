import { useParams } from "react-router-dom"

import { applyMarkdown } from "src/util/applyMarkdown";
import { PostPageParams } from "../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import classes from './Body.module.scss';
import { Content } from "./Content/Content";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Body = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));    

    return (
        <FlexItem width="100%" className={classes.body}>
            <Flex justifyContent="center" flexWrap='wrap'>
                <FlexItem width='100%'>
                    <Flex justifyContent="center" flexWrap='wrap'>
                        <Content />
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
    )
}
