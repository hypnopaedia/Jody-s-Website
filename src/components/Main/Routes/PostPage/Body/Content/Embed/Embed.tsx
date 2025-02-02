import { EmbedData } from "../Content";

type Props = {
    content: string,
    embedData: EmbedData
}

export const Embed = ({ content, embedData }: Props) => {
    return (
        <embed 
            src={content}
            type={embedData.type}
            className={embedData.className}
        />
    );
}