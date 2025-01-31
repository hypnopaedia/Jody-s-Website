import { Button, ButtonProps } from "./Button";
import { Icon, IconProps } from "../Icon";
import clsx from "clsx";
import classes from './IconButton.module.scss';
import { Flex } from "../Flex/Flex";

type Props = Omit<ButtonProps, 'children'> & Pick<IconProps, 'children'> & {
    additionalText?: string,
};

export const IconButton = ({children: iconName, additionalText, ...buttonProps}: Props) => (
    <Button {...buttonProps} className={clsx(buttonProps.className, classes.iconButton)}>
        <Flex justifyContent="center" alignItems="center">
            <><Icon>{iconName}</Icon>{additionalText ?? ''}</>
        </Flex>
    </Button>
);
