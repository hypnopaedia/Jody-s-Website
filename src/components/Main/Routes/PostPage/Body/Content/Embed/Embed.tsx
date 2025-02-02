import { clsx } from "clsx";
import { EmbedData } from "../Content";

type Props = {
    className?: string,
    content: string,
    embedData: EmbedData
}

export const Embed = ({ className, content, embedData }: Props) => {
    return (
        <embed 
            src={content}
            type={embedData.type}
            className={clsx(embedData.className, className)}
        />
    );
}