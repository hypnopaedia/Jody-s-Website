import classes from './Controls.module.scss';
import { Link } from "react-router-dom";
import { IconButton } from 'src/components/shared/Button/IconButton';

export const Controls = () => (
    <Link to="/">
        <IconButton className={classes.back} additionalText='Back'>arrow_back_ios</IconButton>
    </Link>
);
