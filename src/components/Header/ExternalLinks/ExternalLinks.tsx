import { Link } from 'react-router-dom';

import clsx from 'clsx';
import classes from './ExternalLinks.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { Icon } from "../../shared/Icon";

type Link = {
    icon: string,
    url: string,
    title: string,
}

const LINKS: Link[] = [
    {
        title: 'GitHub',
        icon: 'github',
        url: 'https://github.com/hypnopaedia'
    },
    {
        title: 'LinkedIn',
        icon: 'linkedin',
        url: 'https://www.linkedin.com/in/jodysalani/',
    },
    {
        title: 'Gmail',
        icon: 'mail',
        url: 'mailto:jodysalani.dev@gmail.com',
    },
    {
        title: 'SoundCloud',
        icon: 'soundcloud',
        url: 'https://soundcloud.com/hypnopaedia',
    },
    {
        title: 'Spotify',
        icon: 'spotify',
        url: 'https://open.spotify.com/user/jodysalani',
    },
    {
        title: 'Twitch',
        icon: 'twitch',
        url: 'https://www.twitch.tv/hypnopaedia',
    },
    {
        title: 'YouTube',
        icon: 'youtube',
        url: 'https://www.youtube.com/channel/UCRW4VQPoZNZHpsa3R4iqqjA',
    }
]

export const ExternalLinks = () => {
    return (
        <FlexItem width={'fit-content'} className={clsx("d-none", "d-md-flex", 'p-0', classes.externalLinks)}>
            <p className={classes.follow}>Helpful Links:</p>
            <Flex justifyContent="center" alignItems="center" flexWrap="nowrap" gap={0.8} className='p-0'>
                <>
                    {LINKS.map(({title, icon, url}, i) => (
                        <Link key={i} to={url} target='_blank' rel="noopener noreferrer" className={clsx(classes.link,'shake-on-hover')}>
                            <Icon title={title} className={classes.icon}>{`semantic-ui_${icon}`}</Icon>
                        </Link>
                    ))}
                </>
            </Flex>
        </FlexItem>
    );
}
