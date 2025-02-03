import { Link } from "react-router-dom";

import { BACKEND_URL } from "src/axios/config";
import { setTheme } from "src/redux/Theme/slice";
import { useAppDispatch } from "src/redux/store";
import { useTheme } from "src/redux/Theme/hooks/useTheme";

import classes from './Header.module.scss';
import { Button } from "src/components/shared/Button/Button";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Icon } from "../shared/Icon";
import { PixelArt } from "./PixelArt/PixelArt";
import { Switch } from "../shared/Switch/Switch";
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

export const Header = () => {
    const dispatch = useAppDispatch();
    
    const theme = useTheme();

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
                            <Link to="/"><Button>Home</Button></Link>
                            <Link to="/music"><Button>Music</Button></Link>
                            <Link to="/code"><Button>Code</Button></Link>
                            <Link 
                                to={`${BACKEND_URL}/media/resume.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button>Resumé</Button>
                            </Link>
                        </Flex>
                    </nav>
                </FlexItem>

                <FlexItem width={'25%'}>
                    <Flex justifyContent={'right'} className={classes.other}>
                        <PixelArt />
                        <Switch 
                            value={theme === 'dark' ? true : false}
                            onClick={(v) => dispatch(setTheme(v ? 'dark' : 'light'))}
                            left={<Icon>light_mode</Icon>}
                            right={<Icon>dark_mode</Icon>}
                        />
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );
}
