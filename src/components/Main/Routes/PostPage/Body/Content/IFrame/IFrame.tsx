import { clsx } from "clsx";
import classes from './IFrame.module.scss';

type Props = {
    title: string,
    content: string
}

export const IFrame = ({ title, content }: Props) => {

    return (
        <iframe 
            src={content} 
            title={title}
            className={clsx(classes.iframe, getiFrameSourceClass(content))}
            frameBorder="0"
            loading="lazy" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
        ></iframe>
    );

    function getiFrameSourceClass(content: string): string | undefined {
        if ( content.startsWith('https://www.youtube.com/')
                || content.startsWith('https://www.youtube-nocookie.com/') ) return classes.youtube;
        if ( content.startsWith('https://bandcamp.com/') ) return classes.bandcamp;
    }
}
