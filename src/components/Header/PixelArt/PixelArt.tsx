import { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "src/redux/Theme/hooks/useTheme";

import { clsx } from "clsx";
import classes from './PixelArt.module.scss';

type PixelArtGif = {
    src: string, 
    reverse?: boolean,
    style?: CSSProperties,
    smallScreenStyle?: CSSProperties,
    artist: string,
}

const GIFS: PixelArtGif[] = [
    { src: 'https://media.tenor.com/TAFzyHWJB0sAAAAj/okk.gif', artist: 'Meowloye'},
    { src: 'https://media.tenor.com/IR-B2_ZcBDUAAAAj/bits-8bits.gif', artist: 'MeltGui' },
    { src: 'https://media.tenor.com/iGSsICUR-2oAAAAj/mewtwo-sprite.gif', artist: 'dawggg' },
    { src: 'https://media.tenor.com/WhiAlABG7WMAAAAj/sans-undertale.gif', artist: 'cdkw' },
    { src: 'https://media.tenor.com/VNYeun1JbTMAAAAj/kirby.gif', reverse: true, style: { maxHeight: '36px', marginTop: '-8px' }, smallScreenStyle: { marginTop: '0' }, artist: 'xenaisxena' },
    { src: 'https://media.tenor.com/uX1jpz5E4lcAAAAj/bmo-bounce.gif', reverse: true, artist: 'yozshy777' },
    { src: 'https://media.tenor.com/pZlKyUDs0RgAAAAj/pokemon-nintendo.gif', style: { maxHeight: '24px', marginTop: '2px' }, smallScreenStyle: { marginTop: '8px' }, artist: 'SuperWardBros' },
    { src: 'https://media.tenor.com/i8Mus4hXSQEAAAAj/ghost-cute.gif', artist: 'Teardropmybeloved' },
    { src: 'https://media.tenor.com/ZZu2QC-efdUAAAAj/cute-cat-white.gif', artist: 'lyia_066' },
    { src: 'https://media.tenor.com/qycQatpHyVkAAAAj/vaporeon-pokemon.gif', artist: 'darklord1765' },
    { src: 'https://media.tenor.com/VsI4oUh4-wQAAAAj/pixel-rabbit-rabbit.gif', reverse: true, artist: 'Macunero' },
    { src: 'https://media.tenor.com/BhoowfjZeSgAAAAj/pixel-art-kitty.gif', reverse: true, artist: 'gorezai' },
    { src: 'https://media.tenor.com/Pwn9ZYb7C2QAAAAi/gengar-pokemon.gif', artist: 'Ronnie939' },
    { src: 'https://media.tenor.com/wx7iO7HoO0wAAAAi/kirby-sleep.gif', reverse: true, style: { maxHeight: '24px', maxWidth: '32px', marginTop: '4px' }, artist: 'COFFEE_Drinker' },
    { src: 'https://media.tenor.com/8_sLmJL1T0QAAAAi/sora-kingdom-hearts.gif', artist: 'Koisandz' },
    { src: 'https://media.tenor.com/at27bgtYrKsAAAAi/purple-bat.gif', artist: 'Metarupx' },
    { src: 'https://media.tenor.com/u12OHEzDEOIAAAAi/cat-pixel-art.gif', style: { maxHeight: '24px', maxWidth: '36px', marginTop: '6px' }, artist: 'Metarupx' },
    { src: 'https://media.tenor.com/YrR48WQtTQEAAAAj/hamchat-collection.gif', artist: 'naizoutan' },
    { src: 'https://media.tenor.com/Fdo-eLQJI4MAAAAi/bunny-bun.gif', artist: 'ErinMxrie' },
];

type Props = {
    className?: string,
    smallScreenMode?: boolean,
}

export const PixelArt = ({ className, smallScreenMode}: Props) => {
    const location = useLocation();
    const theme = useTheme();

    const [gifIndex, setGifIndex] = useState<number>(getRandomGifIndex());

    useEffect(() => {
        setGifIndex(getRandomGifIndex());
    },[location.pathname,theme]);

    return (
        <img 
            src={GIFS[gifIndex].src} 
            className={clsx(
                classes.pixelArt, 
                GIFS[gifIndex].reverse && 'reverse-image', 
                smallScreenMode && classes.smallScreenMode,
                className, 
            )} 
            style={smallScreenMode
                ? {...GIFS[gifIndex].style, ...GIFS[gifIndex].smallScreenStyle} 
                : {...GIFS[gifIndex].style}}
            onClick={() => setGifIndex(getRandomGifIndex())} 
            title={`sprite by ${GIFS[gifIndex].artist}. Click me!`}
            alt={`sprite by ${GIFS[gifIndex].artist} hosted on Tenor`}
        />
    );

    function getRandomGifIndex() {
        return Math.floor(Math.random() * GIFS.length);
    }
}