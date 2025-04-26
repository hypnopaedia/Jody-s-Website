import { Link } from "react-router-dom";

import { BASE_ANIMATION_DELAY } from '../../../../constants';
import { decode } from 'html-entities';
import { getDate } from 'src/util/date';
import { Post as PostType } from "src/redux/Home/types"

import { useDidAnimationPlay } from 'src/redux/Home/hooks/useDidAnimationPlay';
import { useThemeProps } from "src/theme/memo/useThemeProps";

import clsx from "clsx";
import classes from './ListPost.module.scss';
import { ANIMATION_CLASSES } from 'src/theme/constants';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";

type Props = {
    post: PostType,
    number: number,
}

const { fadeInFromRight } = ANIMATION_CLASSES;

export const ListPost = ({ post, number }: Props) => {
    const didAnimationPlay = useDidAnimationPlay();
    const animationDelay = BASE_ANIMATION_DELAY + (number / 8);

    return (
        <>
            <FlexItem col={0} xl={1} xxl={2}></FlexItem>
            <FlexItem 
                col={12} 
                xl={10} 
                xxl={8} 
                className={clsx(fadeInFromRight,classes.listPostOuter)}
                style={{animationDelay: (didAnimationPlay ? 0 : animationDelay) + 's'}}
            >
                <Link to={`/post/${number}`} className={clsx(classes.link,'no-underline')}>
                    <div 
                        {...useThemeProps(classes.listPost, { fillOnHover: true })}
                    >
                        <Flex justifyContent="left" alignItems="center" className={clsx(classes.listPostFlex, 'px-3')}>
                            <FlexItem col={4} lg={3} className={classes.photoWrapper}>
                                <Flex justifyContent="center" alignItems="center" alignContent="center" className={clsx(classes.photoFlex, 'px-lg-3')}>
                                    <img src={post.photo} 
                                        loading="lazy"
                                        className={classes.photo} 
                                        alt="post picture" 
                                    />
                                </Flex>
                            </FlexItem>
                            <FlexItem col={8} lg={9} className={clsx(classes.content, 'px-0')}>
                                <Flex className={classes.contentFlex} flexWrap="wrap">
                                    <FlexItem col={10}>
                                        <h5 className={classes.title}>{decode(post.title)}</h5>
                                    </FlexItem>
                                    <FlexItem col={2}>
                                        <Flex justifyContent="right" alignContent="flex-end">
                                            <p className={classes.date}>{getDate(post.date)}</p>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem col={12}>
                                        <hr className={classes.hr} />
                                    </FlexItem>
                                    <FlexItem col={12}>
                                        <p className={classes.description}>{post.description}</p>
                                    </FlexItem>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </div>
                </Link>
            </FlexItem>
            <FlexItem col={0} xl={1} xxl={2}></FlexItem>
        </>
    );
}