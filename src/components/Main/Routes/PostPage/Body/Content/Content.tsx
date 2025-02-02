import { Link, useParams } from "react-router-dom";

import { PostPageParams } from "../../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import { clsx } from "clsx";
import classes from './Content.module.scss';
import { Audio } from "./Audio/Audio";
import { Carousel } from "./Carousel/Carousel";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Flex } from "src/components/shared/Flex/Flex";

type EmbedData = {
    type?: string,
    className?: string,
    audioClassName?: string,
}

export const Content = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    const title = `post ${!!post.contentType ? `${post.contentType} `: ''}content`;

    // TODO: Separate these out into separate components
    switch ( post.contentType ) {
        case 'iframe':
            return (
                <div>
                    <iframe 
                        src={post.content} 
                        title={title}
                        className={clsx(classes.iframe, getiFrameSourceClass())}
                        frameBorder="0"
                        loading="lazy" 
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                    {!!post.audio ? <Audio /> : undefined}
                </div>
            )
        case 'file':
            const embedData = getEmbedData(post.content);
            return (
                <div>
                    <embed 
                        src={post.content}
                        type={embedData.type}
                        className={embedData.className}
                    />
                    {!!post.audio ? <Audio className={embedData.audioClassName} /> : undefined}
                </div>
            );
        case 'carousel':
            const images = post.content.split(',');
            return (
                <>
                    <Carousel id={`post-${params.id}-carousel`} className={classes.carousel} images={images} />
                    <FlexItem width="100%">
                        <Flex justifyContent="center">
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

    function getiFrameSourceClass(): string | undefined {
        if ( post.content.startsWith('https://www.youtube.com/')
                || post.content.startsWith('https://www.youtube-nocookie.com/') ) return classes.youtube;
        if ( post.content.startsWith('https://bandcamp.com/') ) return classes.bandcamp;
    }
}   