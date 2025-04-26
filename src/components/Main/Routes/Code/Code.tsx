import { useEffect, useRef } from "react";

import { getProjects } from "src/redux/Code/thunks/getProjects"; 
import { ROUTE_HEADER_ANIMATION_DELAY } from "../../constants";
import { setDidAnimationPlay } from "src/redux/Code/slice";

import { useAppDispatch } from "src/redux/store";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useDidAnimationPlay } from "src/redux/Code/hooks/useDidAnimationPlay";
import { useError } from "src/redux/Code/hooks/useError";
import { useIsLoading } from "src/redux/Code/hooks/useIsLoading";
import { useProjects } from "src/redux/Code/hooks/usePosts";

import clsx from "clsx";
import classes from './Code.module.scss';
import { ANIMATION_CLASSES } from "src/theme/constants";
import { BackToTop } from "src/components/shared/BackToTop/BackToTop";
import { Error } from "src/components/shared/Error/Error";
import { Flex } from "src/components/shared/Flex/Flex";
import { Intro } from "./Intro/Intro";
import { Loading } from "src/components/shared/Loading/Loading";
import { Project } from "./Project/Project";
import { VerticalSpace } from "src/components/shared/VerticalSpace";

export const Code = () => {
    useAppTitle('Code');

    const dispatch = useAppDispatch();

    const projectsRef = useRef<HTMLDivElement | null>(null);
    
    const projects = useProjects();
    const isLoading = useIsLoading();
    const error = useError();

    useEffect(() => {
        if ( !projects.length && !isLoading && !error ) dispatch(getProjects());
    },[]);

    const didAnimationPlay = useDidAnimationPlay();

    useEffect(() => {
        if ( !didAnimationPlay ) {
            setTimeout(() => {
                dispatch(setDidAnimationPlay(true));
            }, ROUTE_HEADER_ANIMATION_DELAY);
        }
    },[]);

    const renderedProjects = projects.map((project,i) => (
        <Project key={i} project={project} number={i}/>
    ));

    return (
        <Flex justifyContent="left" alignItems="center" flexWrap="wrap" className={clsx(classes.code, ANIMATION_CLASSES.fadeInFromRight)}>
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