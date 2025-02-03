import { useParams } from "react-router-dom"

import { applyMarkup } from "src/util/applyMarkup";
import { PostPageParams } from "../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import classes from './Body.module.scss';
import { Content } from "./Content/Content";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";

export const Body = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));    

    return (
        <FlexItem className={classes.body}>
            <Flex justifyContent="center" flexWrap='wrap'>
                <FlexItem>
                    <Flex justifyContent="center" flexWrap='wrap'>
                        <Content />
                    </Flex>
                </FlexItem>
                <FlexItem>
                    <div className={classes.description}>
                        {applyMarkup(post.description)}
                    </div>
                </FlexItem>
            </Flex>  
        </FlexItem>
    )
}
