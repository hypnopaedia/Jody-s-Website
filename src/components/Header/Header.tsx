import { Link } from "react-router-dom";

import { Button } from "src/components/shared/Button/Button";
import { IconButton } from "../shared/Button/IconButton";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

import classes from './Header.module.scss';
import { BACKEND_URL } from "src/axios/config";
import { useState } from "react";

const GIFS = [
    'https://media.tenor.com/TAFzyHWJB0sAAAAj/okk.gif',
    'https://media.tenor.com/IR-B2_ZcBDUAAAAj/bits-8bits.gif',
    'https://media.tenor.com/iGSsICUR-2oAAAAj/mewtwo-sprite.gif',
    'https://media.tenor.com/WhiAlABG7WMAAAAj/sans-undertale.gif',
    'https://media.tenor.com/VNYeun1JbTMAAAAj/kirby.gif',
    'https://media.tenor.com/uX1jpz5E4lcAAAAj/bmo-bounce.gif',
    'https://media.tenor.com/pZlKyUDs0RgAAAAj/pokemon-nintendo.gif',
    'https://media.tenor.com/i8Mus4hXSQEAAAAj/ghost-cute.gif',
    'https://media.tenor.com/ZZu2QC-efdUAAAAj/cute-cat-white.gif',
    'https://media.tenor.com/qycQatpHyVkAAAAj/vaporeon-pokemon.gif',
    'https://media.tenor.com/VsI4oUh4-wQAAAAj/pixel-rabbit-rabbit.gif',
    'https://media.tenor.com/BhoowfjZeSgAAAAj/pixel-art-kitty.gif',
]

export const Header = () => {
    const [gifIndex, setGifIndex] = useState<number>(getRandomGifIndex());

    return (
        <header className={classes.header}>
            <Flex flexWrap="wrap">
                <FlexItem width={'100%'}>
                    <h1>Jody Salani <span className={classes.business}>• ISO ATIMA Solutions</span></h1>
                    <h5>Composer, programmer, ghost, and generally science-defying homonculus </h5>
                </FlexItem>
                
                <FlexItem width={'100%'}>
                    <VerticalSpace height={'12px'} />
                </FlexItem>

                <FlexItem width={'75%'}>
                    <nav>
                        <Flex gap={'15px'} className={classes.navigation}>
                            <Link to="/"><Button theme='secondary'>Blog</Button></Link>
                            <Link to="/music"><Button theme='secondary'>Music</Button></Link>
                            <Link to="/code"><Button theme='secondary'>Code</Button></Link>
                            <Link 
                                to={`${BACKEND_URL}/media/resume.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button theme='secondary'>Resumé</Button>
                            </Link>
                        </Flex>
                    </nav>
                </FlexItem>

                <FlexItem width={'25%'}>
                    <Flex justifyContent={'right'} className={classes.other}>
                        <img src={GIFS[gifIndex]} className={classes.gif} onClick={() => setGifIndex(getRandomGifIndex())} />
                        <IconButton theme='secondary'>
                            settings
                        </IconButton>
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );

    function getRandomGifIndex() {
        return Math.floor(Math.random() * GIFS.length);
    }
}
