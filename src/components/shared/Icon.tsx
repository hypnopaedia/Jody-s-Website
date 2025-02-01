export type IconProps = {
    children: string,
}

export const Icon = ({ children: iconName }: IconProps) => (
    <span className="material-icons">{iconName}</span>
);
