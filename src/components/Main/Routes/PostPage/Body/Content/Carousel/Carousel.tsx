import { useState } from "react";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import classes from './Carousel.module.scss';

type Props = {
    id: string,
    className?: string,
    images: string[]
}

export const Carousel = ({ id, className, images }: Props) => {
    const [active, setActive] = useState(0);

    return (
        <FlexItem className={classes.carousel} padding={0}>
            <div id={id} className={`carousel slide embed_carousel ${className}`} data-ride="carousel">
                <ol className="carousel-indicators">
                    {images.map((img,i) => (
                        <li key={i} data-target={id} data-slide-to={String(i)} className={active === i ? "active" : ""}></li>    
                    ))}
                </ol>
                <div className="carousel-inner">
                    {images.map((img, i) => (
                        <div key={i} className={`carousel-item ${active === i ? "active" : ""}`}>
                            <img className="d-block w-100" src={img} alt={`Slide ${i}`} />
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href={id} role="button" data-slide="prev"
                    onClick={handleClickPrevious}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    {/* <span className="sr-only">Previous</span> */}
                </a>
                <a className="carousel-control-next" href={id} role="button" data-slide="next"
                    onClick={handleClickNext}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    {/* <span className="sr-only">Next</span> */}
                </a>
            </div> 
        </FlexItem>
    );

    function handleClickPrevious(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        e.stopPropagation();
        setActive(active === 0 ? images.length - 1 : active-1);
    }
    
    function handleClickNext(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        e.stopPropagation();
        setActive(active === images.length - 1 ? 0 : active+1);
    }
}
