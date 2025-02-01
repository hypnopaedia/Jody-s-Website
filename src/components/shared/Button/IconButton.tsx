import clsx from "clsx";
import classes from './IconButton.module.scss';
import { Button, ButtonProps } from "./Button";
import { Flex } from "../Flex/Flex";
import { Icon, IconProps } from "../Icon";

type Props = Omit<ButtonProps, 'children'> & Pick<IconProps, 'children'> & {
    additionalText?: string,
    outlined?: boolean,
};

export const IconButton = ({children: iconName, additionalText, outlined=true, ...buttonProps}: Props) => (
    <Button 
        {...buttonProps} 
        className={clsx(
            buttonProps.className, 
            classes.iconButton, 
            !additionalText && classes.iconOnly,
            outlined && classes.outlined
        )}
    >
        <Flex justifyContent="center" alignItems="center">
            <><Icon>{iconName}</Icon>{additionalText ?? ''}</>
        </Flex>
    </Button>
);
