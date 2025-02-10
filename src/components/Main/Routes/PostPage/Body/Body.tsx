import { useRef } from "react";
import { useParams } from "react-router-dom"

import { applyMarkup } from "src/util/applyMarkup";
import { PostPageParams } from "../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import classes from './Body.module.scss';
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Content } from "./Content/Content";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Body = () => {
    const bodyRef = useRef<HTMLDivElement | null>(null);
    
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));    

    return (
        <FlexItem ref={bodyRef} className={classes.body}>
            <Flex justifyContent="center" flexWrap='wrap'>
                <FlexItem>
                    <Flex justifyContent="center" flexWrap='wrap'>
                        <Content />
                    </Flex>
                </FlexItem>
                <FlexItem>
                    <div className={classes.description}>
                        {!!post?.description ? applyMarkup(post.description) : undefined}
                    </div>
                </FlexItem>
                <BackToTop of={bodyRef} />
                <VerticalSpace height="15px" fill={true} />
            </Flex>
        </FlexItem>
    );
}
