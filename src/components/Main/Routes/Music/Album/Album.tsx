import dayjs from "dayjs";

import { Album as AlbumType } from "src/redux/Music/types";

import classes from './Album.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Track } from "./Track/Track";
import { NO_ALBUM_ART_IMG } from "../constants";

type Props = {
    album: AlbumType
}


export const Album = ({ album }: Props) => {
    return (
        <FlexItem col={12} md={10} className="px-0 px-md-3 py-1">
            <Flex className={classes.album}>
                <Flex alignItems="center">
                    <img loading="lazy" src={!!album.photo ? album.photo : NO_ALBUM_ART_IMG} className={classes.albumArt} />
                </Flex>
                <FlexItem className="pt-2 ms-4">
                    <h4>{album.title}</h4>
                    <h6>{dayjs(album.date).year()}</h6>
                </FlexItem>
            </Flex>
            <Flex justifyContent="center">
                <FlexItem className="px-1">
                    <hr/>
                </FlexItem>
            </Flex>
            <Flex justifyContent="center" flexWrap="wrap" gap={1}>
                {album.tracks.map((track,i) => (
                    <Track key={i} track={track} albumId={album.id} />
                ))}
            </Flex>
        </FlexItem>
    );
}
