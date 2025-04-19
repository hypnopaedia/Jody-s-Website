import { useEffect, useMemo } from 'react';

import { setIsMuted, setVolume } from 'src/redux/Music/slice';

import { useActiveAudioRef } from '../../hooks/useActiveAudioRef';
import { useAppDispatch } from 'src/redux/store';
import { usePlayer } from 'src/redux/Music/hook/usePlayer';

import classes from './Volume.module.scss';
import { DragBar } from 'src/components/shared/DragBar/DragBar';
import { Flex } from 'src/components/shared/Flex/Flex';
import { Icon } from 'src/components/shared/Icon';

export const Volume = () => {
    const dispatch = useAppDispatch();

    const activeAudioRef = useActiveAudioRef();

    const { trackId, albumId, isMuted, volume } = usePlayer();

    // update <audio> volume on volume / song change
    useEffect(() => {
        if ( !activeAudioRef.current ) return;
        activeAudioRef.current.volume = volume;
    },[trackId, albumId, volume]);

    // update <audio> muted on isMuted / song change
    useEffect(() => {
        if ( !activeAudioRef.current ) return;
        activeAudioRef.current.muted = isMuted;
    },[trackId, albumId, isMuted]);

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
                initialValue={volume}
                onChange={handleChange}
                onDrag={handleChange}
            />
        </Flex>
    );

    function handleClick() {
        dispatch(setIsMuted(!isMuted));
    }

    function handleChange(v: number | undefined) {
        if (!activeAudioRef.current || !v) return;

        let updatedVolume = Math.round(v*100) / 100;
        updatedVolume = Math.min(1,updatedVolume);
        updatedVolume = Math.max(0,updatedVolume);
        if ( updatedVolume >= 0.93 ) updatedVolume = 1;
        if ( updatedVolume <= 0.07 ) updatedVolume = 0;
        
        dispatch(setVolume(updatedVolume));
    }
}
