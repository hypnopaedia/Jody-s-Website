import classes from './Header.module.scss';
import { ExternalLinks } from "./ExternalLinks/ExternalLinks";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Navigation } from "./Navigation/Navigation";
import { PixelArt } from "./PixelArt/PixelArt";
import { ThemeSwitch } from "./ThemeSwitch/ThemeSwitch";
import { VerticalSpace } from 'src/components/shared/VerticalSpace';

export const Header = () => {
    

    return (
        <header className={classes.header}>
            <Flex flexWrap="wrap">
                <FlexItem col={12} sm={8}>
                    <h1>Jody Salani <span className={classes.business}>| ISO ATIMA Solutions</span></h1>
                    <h5>Composer, programmer, ghost, and generally science-defying homonculus </h5>
                </FlexItem>
                
                <FlexItem>
                    <VerticalSpace height={'12px'} />
                </FlexItem>

                <FlexItem col={6}>
                    <Navigation />
                </FlexItem>

                <FlexItem col={6}>
                    <Flex justifyContent={'end'} className={classes.other} gap={1} padding={0}>
                        <PixelArt />
                        <ExternalLinks />
                        <ThemeSwitch />
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );
}
