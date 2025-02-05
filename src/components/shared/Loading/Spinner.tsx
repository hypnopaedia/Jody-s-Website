import clsx from "clsx"
import { useTheme } from "src/redux/Theme/hooks/useTheme";

type Props = {
    className?: string,
    hidden?: boolean,
    inline?: boolean,
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'big',
}

export const Spinner = ({ className, hidden, inline, size }: Props) => {
    const theme = useTheme();

    return (
        <div className={clsx('ui', 'loader', 
            !hidden && 'active', 
            size, 
            inline && 'inline',
            theme === 'dark' && 'inverted',
            className
        )}></div>
    );
}
