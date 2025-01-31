import classes from './Controls.module.scss';
import { Link } from "react-router-dom";
import { Button } from "src/components/shared/Button/Button";

export const Controls = () => {
    
    //TODO: IconButton w/ back icon
    return (
        <Link to="/">
            <Button className={classes.back}>{'< Back'}</Button>
        </Link>
    );
}
