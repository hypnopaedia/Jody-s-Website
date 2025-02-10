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
                <FlexItem col={10}>
                    <h1>Jody Salani <span className={classes.business}>| ISO ATIMA Solutions</span></h1>
                    <h5>Composer, programmer, ghost, and generally science-defying homonculus </h5>
                </FlexItem>

                <FlexItem col={2} className='d-block d-md-none'>
                    <Flex justifyContent='end' className='p-0'>
                        <PixelArt smallScreenMode={true} />
                    </Flex>
                </FlexItem>
                
                <FlexItem col={12}>
                    <VerticalSpace height={'12px'} />
                </FlexItem>

                <FlexItem md={7} col={10}>
                    <Navigation />
                </FlexItem>

                <FlexItem md={5} col={2}>
                    <Flex justifyContent={'end'} className={classes.other} gap={0.5} padding={0}>
                        <FlexItem width='fit-content' className='d-none d-md-inline-flex'><PixelArt /></FlexItem>
                        <ExternalLinks />
                        <ThemeSwitch />
                    </Flex>
                </FlexItem>
            </Flex>
        </header>
    );
}
