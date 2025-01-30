import React from "react";

import { Button } from "src/components/shared/Button/Button";
import { IconButton } from "../shared/Button/IconButton";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

import classes from './Header.module.scss';

export const Header = () => {
    return (
        <header className={classes.header}>
            <Flex flexWrap="wrap">
                <FlexItem width={'100%'}>
                    <h1>Jody Salani <span className={classes.business}>• ISO ATIMA Solutions</span></h1>
                    <h5>Composer, programmer, ghost, and generally science-defying homonculus </h5>
                </FlexItem>

                {/* <FlexItem width={'50%'}></FlexItem> */}
                
                <FlexItem width={'100%'}>
                    <VerticalSpace height={'12px'} />
                </FlexItem>

                <FlexItem width={'75%'}>
                    <Flex gap={'15px'} className={classes.navigation}>
                        <Button theme='secondary'>Click Me!</Button>
                        <Button theme='secondary'>No, Click Me!</Button>
                        <Button theme='secondary'>I Yearn to be clicked!</Button>
                        <Button theme='secondary'>Click Someone Else!</Button>     
                    </Flex>
                </FlexItem>

                <FlexItem width={'25%'}>
                    <Flex justifyContent={'right'}>
                        <IconButton theme='secondary'>
                            settings
                        </IconButton>
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );
}
