import { useParams } from "react-router-dom";

import { PostPageParams } from "../../../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import { clsx } from "clsx";
import classes from './Audio.module.scss';

type Props = {
    className?: string
}

export const Audio = ({ className }: Props) => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    if ( !post?.audio ) return null;

    const audio = post.audio;
    
    return (
        <>
            <br/>
            <audio
                className={clsx(className, classes.audio)}
                controls
            >
                <source src={audio} type="audio/mpeg" />
            </audio>
        </>
    );
}