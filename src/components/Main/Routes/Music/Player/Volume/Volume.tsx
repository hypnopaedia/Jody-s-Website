import { useEffect, useMemo, useState } from 'react';

import { useActiveAudioRef } from '../../hooks/useActiveAudioRef';

import classes from './Volume.module.scss';
import { DragBar } from 'src/components/shared/DragBar/DragBar';
import { Flex } from 'src/components/shared/Flex/Flex';
import { Icon } from 'src/components/shared/Icon';

export const Volume = () => {
    const audio = useActiveAudioRef();

    const [isMuted, setIsMuted] = useState<boolean>(audio.current?.muted ?? false);
    const [volume,setVolume] = useState<number>(audio.current?.volume ?? 1);

    useEffect(() => {
        if (!audio.current) return;
        audio.current.muted = isMuted;
    }, [isMuted]);

    const icon = useMemo(() => {
        if ( isMuted ) return 'volume_off';
        if ( volume < 0.1 ) return 'volume_mute';
        if ( volume < 0.5) return 'volume_down';
        return 'volume_up';
    },[volume,isMuted]);

    return (
        <Flex className={classes.volumeWrapper} gap={1}>
            <Icon onClick={handleClick}>{icon}</Icon>
            <DragBar
                initialValue={audio.current?.volume}
                onChange={handleChange}
                onDrag={handleChange}
            />
        </Flex>
    );

    function handleClick() {
        setIsMuted(!isMuted);
    }

    function handleChange(v: number | undefined) {
        if (!audio.current || !v) return;

        let updatedVolume = Math.round(v*100) / 100;
        updatedVolume = Math.min(1,updatedVolume);
        updatedVolume = Math.max(0,updatedVolume);
        if ( updatedVolume >= 0.93 ) updatedVolume = 1;
        if ( updatedVolume <= 0.07 ) updatedVolume = 0;
        
        audio.current.volume = updatedVolume;
        setVolume(updatedVolume);
    }
}
