type Props = {
    height: string
}

export const VerticalSpace = ({ height }: Props) => (
    <div style={{height, width: '1px'}}></div>
);