import { Link, useParams } from "react-router-dom";

import { BACKEND_URL } from "src/axios/config";
import { PostPageParams } from "../../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import classes from './Content.module.scss';
import { Audio } from "./Audio/Audio";
import { Carousel } from "./Carousel/Carousel";
import { Embed } from "./Embed/Embed";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Flex } from "src/components/shared/Flex/Flex";
import { IFrame } from "./IFrame/IFrame";

export type EmbedData = {
    type?: string,
    className?: string,
    audioClassName?: string,
}

export const Content = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    const title = `post ${!!post.contentType ? `${post.contentType} `: ''}content`;

    const content = post.content.startsWith('/') ? BACKEND_URL + post.content : post.content;

    switch ( post.contentType ) {
        case 'iframe':
            return (
                <div>
                    <IFrame title={title} content={content} />
                    {!!post.audio ? <Audio /> : undefined}
                </div>
            )
        case 'file':
            const embedData = getEmbedData(content);
            return (
                <div>
                    <Embed content={content} embedData={embedData} className={!!post.audio ? classes.pdfWithAudio : undefined}/>
                    {!!post.audio ? <Audio className={embedData.audioClassName} /> : undefined}
                </div>
            );
        case 'carousel':
            const images = content.split(',');
            return (
                <>
                    <Carousel id={`post-${params.id}-carousel`} images={images} />
                    <FlexItem padding={0}>
                        <Flex justifyContent="center" padding={0}>
                            {!!post.audio ? <Audio className={classes.carouselAudio} /> : undefined}
                        </Flex>
                    </FlexItem>
                </>
            );
        default: 
            return (
                <div>
                    {!!post.url ? (
                        <Link to={post.url} target="_blank" rel="noopener noreferrer">
                            <img src={post.photo} className={classes.photo} title={title} alt={title} />
                        </Link>
                    ) : (
                        <img src={post.photo} className={classes.photo} title={title} alt={title} />
                    )}
                    {!!post.audio ? <Audio /> : undefined}
                </div>
            );
    }

    function getEmbedData(contentName: string): EmbedData {
        if ( contentName.endsWith('.pdf') ) return { type: 'application/pdf', className: classes.pdf, audioClassName: classes.pdfAudio };
        return {};
    }
}   