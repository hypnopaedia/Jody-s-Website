import classes from './Loading.module.scss';
import { FlexItem } from "../Flex/FlexItem/FlexItem";
import { Spinner } from "./Spinner";

type Props = {
    text?: string;
}

export const Loading = ({ text="Loading..." }: Props) => (
    <FlexItem>
        <h5 className={classes.loadingText}>
            <Spinner size="tiny" inline={true} className={classes.spinner} />
            {text}
        </h5>
    </FlexItem>
);
