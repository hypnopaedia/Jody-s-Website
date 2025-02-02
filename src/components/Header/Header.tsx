import { Link } from "react-router-dom";

import { Button } from "src/components/shared/Button/Button";
import { IconButton } from "../shared/Button/IconButton";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

import classes from './Header.module.scss';
import { BACKEND_URL } from "src/axios/config";

export const Header = () => {
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
                        <IconButton theme='secondary'>
                            settings
                        </IconButton>
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );
}
