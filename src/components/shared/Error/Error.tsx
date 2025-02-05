import classes from './Error.module.scss';
import { FlexItem } from "../Flex/FlexItem/FlexItem"

export const Error = () => (
    <FlexItem className={classes.error}>
        <h1>:(</h1><br/>
        <h5>Oops! Something went wrong. Please try again later.</h5>
    </FlexItem>
);
