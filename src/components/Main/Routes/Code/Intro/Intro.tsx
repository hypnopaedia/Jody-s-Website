import { Link } from "react-router-dom";

import { useDidAnimationPlay } from "src/redux/Code/hooks/useDidAnimationPlay";

import classes from './Intro.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { IconButton } from "src/components/shared/Button/IconButton";
import { TypeOut } from "src/components/shared/TypeOut/TypeOut";

export const Intro = () => {
    const didAnimationPlay = useDidAnimationPlay();
    
    return (
        <>
            <FlexItem col={12} md={3} lg={2}>
                <Flex justifyContent="center" alignItems="center" flexWrap="wrap" className="row-gap-3">
                    <Link to="https://github.com/hypnopaedia" target="_blank" rel="noopener noreferrer" className={classes.link}>
                        <Flex justifyContent="center" flexWrap="wrap" gap={1} className={classes.id}>
                            <img src="https://s13.gifyu.com/images/b297Z.jpg" className={classes.photo} />
                            <FlexItem>
                                <p>@hypnopaedia</p>
                            </FlexItem>
                            <IconButton iconBack={true} additionalText="Follow me on GitHub" className={classes.external}>arrow_outward</IconButton>
                        </Flex>
                    </Link>
                </Flex>
            </FlexItem>
            <FlexItem col={12} md={9} lg={10} className="d-none d-md-block">
                <Flex justifyContent="center" alignItems="center">
                    <div className={classes.introTypeout}>
                        <TypeOut className="code" fontSize={11} skip={didAnimationPlay}>
                            {[
                                'I\'ve been involved with a lot of cool projects over the years.',
                                'Sadly, I can\'t show off everything I\'ve worked on. But I\'ve tried to compile anything that might be interesting here!',
                                'Take a look at some of the code I can share with you below:',
                                '',
                                '// TODO: this Terminal effect is sick, gotta make this available to people'
                            ]}
                        </TypeOut>
                    </div>
                </Flex>
            </FlexItem>
            <FlexItem col={12}><hr/></FlexItem>
        </>
    );
}
