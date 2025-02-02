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
    
    return (
        <>
            <br/>
            <audio
                className={clsx(className, classes.audio)}
                controls
            >
                <source src={post.audio} type="audio/mpeg" />
            </audio>
        </>
    );
}