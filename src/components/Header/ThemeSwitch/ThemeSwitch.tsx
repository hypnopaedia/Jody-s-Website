import { setTheme } from "src/redux/Theme/slice";
import { useAppDispatch } from "src/redux/store";
import { useTheme } from "src/redux/Theme/hooks/useTheme";

import clsx from "clsx";
import classes from './ThemeSwitch.module.scss';
import { ANIMATION_CLASSES } from "src/theme/constants";
import { Icon } from "src/components/shared/Icon";
import { Switch } from "src/components/shared/Switch/Switch";

export const ThemeSwitch = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    return (
        <>
            <Switch 
                value={theme === 'dark' ? true : false}
                onClick={(v) => dispatch(setTheme(v ? 'dark' : 'light'))}
                className="d-none d-sm-flex"
                left={<Icon className={ANIMATION_CLASSES.shakeOnHover}>light_mode</Icon>}
                right={<Icon className={ANIMATION_CLASSES.shakeOnHover}>dark_mode</Icon>}
            />
            {theme === 'dark' ? (
                <Icon className={clsx("d-flex d-sm-none", ANIMATION_CLASSES.shakeOnHover, classes.standaloneIcon)} onClick={() => dispatch(setTheme('light'))}>light_mode</Icon>
            ) : (
                <Icon className={clsx("d-flex d-sm-none", ANIMATION_CLASSES.shakeOnHover, classes.standaloneIcon)} onClick={() => dispatch(setTheme('dark'))}>dark_mode</Icon>
            )}
        </>
    );
}