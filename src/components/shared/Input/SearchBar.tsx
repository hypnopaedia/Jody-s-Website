import clsx from "clsx";
import classes from './SearchBar.module.scss';
import { DebounceInput, DebounceInputProps } from "./DebounceInput";
import { Icon } from "../Icon";

type Props = DebounceInputProps & {}

export const SearchBar = ({ className, ...debounceInputProps }: Props) => (
    <div>
        <Icon className={classes.searchIcon}>search</Icon>
        <DebounceInput
            {...debounceInputProps}
            className={clsx(classes.searchBar, className)}
        />
    </div>
);
