import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { Album as AlbumType } from "src/redux/Music/types";
import { BASE_ANIMATION_DELAY } from "src/components/Main/constants";
import { NO_ALBUM_ART_IMG } from "../constants";

import { useDidAnimationPlay } from "src/redux/Music/hook/useDidAnimationPlay";

import classes from './Album.module.scss';
import clsx from "clsx";
import { ANIMATION_CLASSES } from "src/theme/constants";
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Icon } from "src/components/shared/Icon";
import { Track } from "./Track/Track";

type Props = {
    album: AlbumType,
    number: number,
}

export const Album = ({ album, number }: Props) => {
    const didAnimationPlay = useDidAnimationPlay();
    const animationDelay = BASE_ANIMATION_DELAY + (number / 6);

    return (
        <FlexItem col={12} md={10} id={getAlbumId()}
            className={clsx(!didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight, classes.album, "px-0 px-md-3 py-1")}
            style={{ animationDelay: animationDelay + 's' }}
        >
            <Flex className={classes.albumHeader} justifyContent="center">
                <Flex justifyContent="center" alignItems="center">
                    <img loading="lazy" src={!!album.photo ? album.photo : NO_ALBUM_ART_IMG} className={classes.albumArt} />
                </Flex>
                <FlexItem md={10} sm={9} col={8} className="pt-2 ms-sm-4 ms-2">
                    <h4>
                        {album.title}
                        <span className={classes.albumAnchor}>
                            <Link to={`/music/#${getAlbumId()}`}><Icon>link</Icon></Link>
                        </span>
                    </h4>
                    <h6>{dayjs(album.date).year()} • {album.genre}</h6>
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

    function getAlbumId() {
        return `album-${album.id}`
    }
}
