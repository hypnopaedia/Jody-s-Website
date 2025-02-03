import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "src/redux/Theme/hooks/useTheme";

import { clsx } from "clsx";
import classes from './PixelArt.module.scss';

type PixelArtGif = {
    src: string, 
    reverse?: boolean
}

const GIFS: PixelArtGif[] = [
    { src: 'https://media.tenor.com/TAFzyHWJB0sAAAAj/okk.gif', },
    { src: 'https://media.tenor.com/IR-B2_ZcBDUAAAAj/bits-8bits.gif', },
    { src: 'https://media.tenor.com/iGSsICUR-2oAAAAj/mewtwo-sprite.gif', },
    { src: 'https://media.tenor.com/WhiAlABG7WMAAAAj/sans-undertale.gif', },
    { src: 'https://media.tenor.com/VNYeun1JbTMAAAAj/kirby.gif', reverse: true },
    { src: 'https://media.tenor.com/uX1jpz5E4lcAAAAj/bmo-bounce.gif', reverse: true },
    { src: 'https://media.tenor.com/pZlKyUDs0RgAAAAj/pokemon-nintendo.gif', },
    { src: 'https://media.tenor.com/i8Mus4hXSQEAAAAj/ghost-cute.gif', },
    { src: 'https://media.tenor.com/ZZu2QC-efdUAAAAj/cute-cat-white.gif', },
    { src: 'https://media.tenor.com/qycQatpHyVkAAAAj/vaporeon-pokemon.gif', },
    { src: 'https://media.tenor.com/VsI4oUh4-wQAAAAj/pixel-rabbit-rabbit.gif', reverse: true },
    { src: 'https://media.tenor.com/BhoowfjZeSgAAAAj/pixel-art-kitty.gif', reverse: true },
]

export const PixelArt = () => {
    const location = useLocation();
    const theme = useTheme();

    const [gifIndex, setGifIndex] = useState<number>(getRandomGifIndex());

    useEffect(() => {
        setGifIndex(getRandomGifIndex());
    },[location.pathname,theme]);

    return (
        <img 
            src={GIFS[gifIndex].src} 
            className={clsx(classes.pixelArt, GIFS[gifIndex].reverse && 'reverse-image')} 
            onClick={() => setGifIndex(getRandomGifIndex())} 
            title="Click Me!"
        />
    );

    function getRandomGifIndex() {
        return Math.floor(Math.random() * GIFS.length);
    }
}