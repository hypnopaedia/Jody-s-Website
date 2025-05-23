import { decode } from 'html-entities';

import { ANIMATION_CLASSES } from 'src/theme/constants';
import { BASE_ANIMATION_DELAY } from '../../../../constants';
import { getDate } from 'src/util/date';
import { Post as PostType } from "src/redux/Home/types"
import { useDidAnimationPlay } from 'src/redux/Home/hooks/useDidAnimationPlay';
import { useThemeProps } from "src/theme/memo/useThemeProps";

import classes from './TilePost.module.scss';
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem"
import { Link } from 'react-router-dom';

type Props = {
    post: PostType,
    number: number,
}

const { fadeInFromRight } = ANIMATION_CLASSES;

export const TilePost = ({ post, number }: Props) => {
    const didAnimationPlay = useDidAnimationPlay();
    const animationDelay = BASE_ANIMATION_DELAY + (number / 10);

    return (
        <>
            {number % 5 === 0 ? <FlexItem xxl={1} display='none xxl-block' className='beginning'></FlexItem> : undefined}
            <FlexItem xxl={2} lg={3} md={4} sm={10} xs={12}>
                <div 
                    className={fadeInFromRight}
                    style={{animationDelay: (didAnimationPlay ? 0 : animationDelay) + 's'}}
                >
                    <Link to={`/post/${number}`} className='no-underline'>
                        <div 
                            {...useThemeProps(classes.postSquare, { fillOnHover: true })}
                        >
                            <img src={post.photo} loading="lazy" className={classes.photo} alt="post picture" />
                            <hr />
                            <p className={classes.title}>{decode(post.title)}</p>
                            <p className={classes.date}>{getDate(post.date)}</p>
                        </div>
                    </Link>
                </div>
            </FlexItem>
            {(number + 1) % 5 === 0 ? <FlexItem xxl={1} display='none xxl-block' className='end'></FlexItem> : undefined}
        </>
    )
}