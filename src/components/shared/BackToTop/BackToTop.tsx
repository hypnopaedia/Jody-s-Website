import { RefObject } from "react";

import classes from './BackToTop.module.scss';
import { Flex } from "../Flex/Flex";
import { FlexItem } from "../Flex/FlexItem/FlexItem";
import { ScrollTo } from "../ScrollTo/ScrollTo";

type Props = {
    of: RefObject<HTMLElement | null> | string;
}

export const BackToTop = ({ of }: Props) => (
    <FlexItem>
        <Flex justifyContent="center" alignItems="center">
            <ScrollTo scrollToElement={of}>
                <div className={classes.backToTop}>^ Back To Top</div>
            </ScrollTo>
        </Flex>
    </FlexItem>
);
