type Props = {
    height: string,
    fill?: boolean,
}

export const VerticalSpace = ({ height, fill=false }: Props) => (
    <div style={{height, width: fill ? '100%' : '1px'}}></div>
);