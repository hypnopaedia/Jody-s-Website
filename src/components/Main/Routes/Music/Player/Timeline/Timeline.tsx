import { useRef } from 'react';

import { NULL_TIME } from '../../constants';
import { secondsToDisplayTime } from 'src/util/secondsToDisplayTime';
import { useActiveAudioRef } from '../../hooks/useActiveAudioRef';
import { useHandleTimelineTransitions } from './hooks/useHandleTimelineTransitions';
import { usePlayer } from 'src/redux/Music/hook/usePlayer';
import { useThemeProps } from 'src/theme/memo/useThemeProps';
import { useUpdateTrackTimeOnClick } from './hooks/useUpdateTrackTimeOnClick';

import clsx from 'clsx';
import classes from './Timeline.module.scss';
import { Flex } from 'src/components/shared/Flex/Flex';
import { FlexItem } from 'src/components/shared/Flex/FlexItem/FlexItem';
import { useCurrentDisplayTime } from './hooks/useCurrentDisplayTime';

export const Timeline = () => {
    const activeAudioRef = useActiveAudioRef();

    const linesContainerRef = useRef<HTMLDivElement | null>(null);
    const foregroundLineRef = useRef<HTMLDivElement | null>(null);
    const stylusRef = useRef<HTMLDivElement | null>(null);

    const { duration } = usePlayer();
    const displayTime = useCurrentDisplayTime();

    useHandleTimelineTransitions(activeAudioRef,foregroundLineRef);
    useUpdateTrackTimeOnClick(activeAudioRef, foregroundLineRef, linesContainerRef);

    return (
        <Flex justifyContent='center' alignItems='center' className={classes.timeline} gap={1}>
            <FlexItem col={1}>
                <p className={clsx(classes.time,classes.currentTime)}>{displayTime}</p>
            </FlexItem>
            <FlexItem ref={linesContainerRef} col={9} xl={10} className={classes.linesContainer} flexShrink={3}>
                <div className={clsx(classes.line, classes.backgroundLine)}></div>
                <div className={clsx(classes.foregroundLineWrapper, 'd-flex flex-nowrap align-items-center')}>
                    <div ref={foregroundLineRef} 
                        className={clsx(classes.line, classes.foregroundLine, classes.slidingWidth)} 
                    >                        
                    </div>
                    <div 
                        ref={stylusRef} 
                        {...useThemeProps(classes.stylus)} 
                    ></div>
                </div>
            </FlexItem>
            <FlexItem col={1}>
                <p className={clsx(classes.time,classes.duration)}>{duration !== undefined ? secondsToDisplayTime(duration) : NULL_TIME}</p>
            </FlexItem>
        </Flex>
    );
}
