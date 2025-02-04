import clsx from "clsx";

export type IconProps = {
    children: string,
}

const SEMANTIC_UI_PREFIX = 'semantic-ui_';

export const Icon = ({ children: iconName }: IconProps) => (
    iconName.startsWith('semantic-ui_') ? (
        <i className={clsx(`${iconName.slice(SEMANTIC_UI_PREFIX.length)}`,'icon', 'semantic-ui-icons')}></i>
    ) : (
        <span className="material-icons">{iconName}</span>
    )
);
