import { setTheme } from "src/redux/Theme/slice";
import { useAppDispatch } from "src/redux/store";
import { useTheme } from "src/redux/Theme/hooks/useTheme";

import { Icon } from "src/components/shared/Icon";
import { Switch } from "src/components/shared/Switch/Switch";

export const ThemeSwitch = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    return (
        <Switch 
            value={theme === 'dark' ? true : false}
            onClick={(v) => dispatch(setTheme(v ? 'dark' : 'light'))}
            left={<Icon className="shake-on-hover">light_mode</Icon>}
            right={<Icon className="shake-on-hover">dark_mode</Icon>}
        />
    );
}