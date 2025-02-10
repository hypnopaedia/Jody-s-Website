import { useEffect, useRef } from "react";

import { getProjects } from "src/redux/Code/thunks/getProjects"; 
import { setDidAnimationPlay } from "src/redux/Code/slice";
import { useAppDispatch } from "src/redux/store";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useDidAnimationPlay } from "src/redux/Code/hooks/useDidAnimationPlay";
import { useError } from "src/redux/Code/hooks/useError";
import { useIsLoading } from "src/redux/Code/hooks/useIsLoading";
import { useProjects } from "src/redux/Code/hooks/usePosts";

import clsx from "clsx";
import classes from './Code.module.scss';
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Error } from "src/components/shared/Error/Error";
import { Flex } from "src/components/shared/Flex/Flex";
import { Intro } from "./Intro/Intro";
import { Loading } from "src/components/shared/Loading/Loading";
import { Project } from "./Project/Project";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

const BASE_ANIMATION_DELAY = 750;

export const Code = () => {
    const projectsRef = useRef<HTMLDivElement | null>(null);
    
    const dispatch = useAppDispatch();

    const projects = useProjects();
    const isLoading = useIsLoading();
    const error = useError();

    const didAnimationPlay = useDidAnimationPlay();

    useAppTitle('Code');

    useEffect(() => {
        if ( !projects.length && !isLoading && !error ) dispatch(getProjects());
    },[]);

    useEffect(() => {
        if ( !didAnimationPlay ) {
            setTimeout(() => {
                dispatch(setDidAnimationPlay(true));
            }, BASE_ANIMATION_DELAY + 3000);
        }
    },[]);

    const renderedProjects = projects.map((project,i) => (
        <Project key={i} index={i}/>
    ));

    return (
        <Flex justifyContent="left" alignItems="center" flexWrap="wrap" className={clsx(classes.code, 'fade-in-from-right')}>
            <Intro />
            <Flex ref={projectsRef} justifyContent="center" flexWrap="wrap" className={clsx(classes.projects)}>
                {isLoading
                    ? <Loading text="Loading Coding Projects..." />
                    : !!error ? (
                        <Error />
                        ) : <>{renderedProjects}</>
                }
                <BackToTop of={projectsRef} />
                <VerticalSpace height="15px" fill={true} />
            </Flex>
        </Flex>
    );
};