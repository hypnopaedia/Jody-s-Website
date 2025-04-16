import { useEffect, useState } from 'react';

import { useActiveAudioRef } from '../../hooks/useActiveAudioRef';

import classes from './Volume.module.scss';
import { DragBar } from 'src/components/shared/DragBar/DragBar';
import { Flex } from 'src/components/shared/Flex/Flex';
import { Icon } from 'src/components/shared/Icon';

export const Volume = () => {
    const audio = useActiveAudioRef();

    const [muted,setMuted] = useState<boolean>(audio.current?.muted ?? false);

    useEffect(() => {
        if ( !audio.current ) return;
        audio.current.muted = muted;
    },[muted]);

    return (
        <Flex className={classes.volumeWrapper} gap={1}>
            <Icon onClick={handleClick}>{muted ? 'volume_mute' : 'volume_up'}</Icon>
            <DragBar 
                initialValue={audio.current?.volume}
                
                onChange={handleChange}
                onDrag={handleChange}
            />
        </Flex>
    );

    function handleClick() {
        setMuted(!muted);
    }

    function handleChange(v: number | undefined) {
        if ( !audio.current || !v ) return;
        audio.current.volume = v;
    }
}
