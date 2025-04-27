import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom"
import Markdown from "react-markdown";

import { prepareMarkdown } from "src/util/prepareMarkdown";
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

    const formattedMarkdown = useMemo(() => prepareMarkdown(post?.description), [post?.description]); 

    return (
        <FlexItem ref={bodyRef} className={classes.body}>
            <Flex justifyContent="center" flexWrap='wrap' gap={2}>
                <FlexItem>
                    <Flex justifyContent="center" flexWrap='wrap'>
                        <Content />
                    </Flex>
                </FlexItem>
                <FlexItem>
                    <div className={classes.description}>
                        <div>
                        {!!post?.description ? (
                            <Markdown
                                components={{
                                    a({children, href, ...props}) {
                                        return (
                                            <a href={href}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >{children}</a>
                                        );
                                    },
                                    ul({children, ...props}) { 
                                        return (
                                        <ul className={classes.ul}>
                                            {children}
                                        </ul>); },
                                }}
                            >{formattedMarkdown}</Markdown>
                        ) : undefined}
                        </div>
                    </div>
                </FlexItem>
                <BackToTop of={bodyRef} />
                <VerticalSpace height="15px" fill={true} />
            </Flex>
        </FlexItem>
    );
}
