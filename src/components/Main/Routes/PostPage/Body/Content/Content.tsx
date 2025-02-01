import { Link, useParams } from "react-router-dom";

import { PostPageParams } from "../../types"
import { usePost } from "src/redux/Home/hooks/usePost"

import { clsx } from "clsx";
import classes from './Content.module.scss';

type EmbedData = {
    type?: string,
    className?: string,
    audioClassName?: string,
}

export const Content = () => {
    const params = useParams<PostPageParams>();
    const post = usePost(Number(params.id));

    const title = `post ${!!post.contentType ? `${post.contentType} `: ''}content`;

    // TODO: getAudio() -> component

    return (
        <div>
            {getContent()}
        </div>
    )
    
    function getContent() {
        switch ( post.contentType ) {
            case 'iframe':
                return (
                    <>
                        <iframe 
                            src={post.content} 
                            title={title}
                            className={clsx(classes.iframe, getiFrameSourceClass())}
                            frameBorder="0"
                            loading="lazy" 
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                        {!!post.audio ? getAudio() : undefined}
                    </>
                )
            case 'file':
                const embedData = getEmbedData(post.content);
                return (
                    <>
                        <embed 
                            src={post.content}
                            type={embedData.type}
                            className={embedData.className}
                        />
                        {!!post.audio ? getAudio(embedData.audioClassName) : undefined}
                    </>
                );
            case 'carousel':
                return <>carousel</>
            default: 
                return (
                    <>
                    {!!post.url ? (
                        <Link to={post.url} target="_blank" rel="noopener noreferrer">
                            <img src={post.photo} className={classes.photo} title={title} alt={title} />
                        </Link>
                    ) : (
                        <img src={post.photo} className={classes.photo} title={title} alt={title} />
                    )}
                    {!!post.audio ? getAudio() : undefined}
                    </>
                );
        }
    }

    function getAudio(className?: string) {
        return (
            <>
                <br/>
                <audio
                    className={clsx(classes.audio, className)}
                    controls
                >
                    <source src={post.audio} type="audio/mpeg" />
                </audio>
            </>
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