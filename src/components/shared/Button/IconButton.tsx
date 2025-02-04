import clsx from "clsx";
import classes from './IconButton.module.scss';
import { Button, ButtonProps } from "./Button";
import { Flex } from "../Flex/Flex";
import { Icon, IconProps } from "../Icon";

type Props = Omit<ButtonProps, 'children'> & Pick<IconProps, 'children'> & {
    additionalText?: string,
    outlined?: boolean,
    iconBack?: boolean,
};

export const IconButton = ({children: iconName, additionalText, outlined=true, iconBack=false, ...buttonProps}: Props) => (
    <Button 
        {...buttonProps} 
        className={clsx(
            buttonProps.className, 
            classes.iconButton, 
            !additionalText && classes.iconOnly,
            outlined && classes.outlined
        )}
    >
        <Flex justifyContent="center" alignItems="center" padding={0}>
            <>
                {iconBack ? undefined : <Icon>{iconName}</Icon>}
                {additionalText ?? ''}
                {iconBack ? <Icon>{iconName}</Icon> : undefined}
            </>
        </Flex>
    </Button>
);
