import clsx from "clsx";

export type IconProps = {
    children: string,
    className?: string,
    title?: string,
}

const SEMANTIC_UI_PREFIX = 'semantic-ui_';

export const Icon = ({ children: iconName, className, title }: IconProps) => (
    iconName.startsWith('semantic-ui_') ? (
        <i title={title} className={clsx(`${iconName.slice(SEMANTIC_UI_PREFIX.length)}`,'icon', 'semantic-ui-icons', className)}></i>
    ) : (
        <span title={title} className={clsx("material-icons", 'cursor-default', className)}>{iconName}</span>
    )
);
