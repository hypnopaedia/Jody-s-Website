import { Link } from "react-router-dom";

import { BASE_ANIMATION_DELAY } from "src/components/Main/constants";
import { Project as ProjectType } from "src/redux/Code/types";

import { useDidAnimationPlay } from "src/redux/Code/hooks/useDidAnimationPlay";

import clsx from "clsx";
import classes from './Project.module.scss';
import { ANIMATION_CLASSES } from "src/theme/constants";
import { Flex } from "src/components/shared/Flex/Flex"
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem"
import { IconButton } from "src/components/shared/Button/IconButton";

type Props = {
    number: number,
    project: ProjectType
}

export const Project = ({ number, project }: Props) => {
    const didAnimationPlay = useDidAnimationPlay();
    const animationDelay = (BASE_ANIMATION_DELAY / 4) + (number / 4);

    return (
        <FlexItem col={12} 
            className={clsx(classes.project, !didAnimationPlay && ANIMATION_CLASSES.fadeInFromRight, 'p-0')}
            style={{animationDelay: animationDelay + 's'}}
        >
            <Flex justifyContent="center" flexWrap="wrap" className="p-0">
                <FlexItem md={2} col={3} display='none md-block' className={classes.photoWrapper}>
                    <Flex justifyContent="center" alignItems="center" className={clsx(classes.photoFlex)}>
                        {!!project.url ? (
                            <Link to={project.url} target="_blank" rel="noopener noreferrer">
                                <Flex justifyContent="center" alignItems="center" className="p-0">
                                    <ProjectImage />
                                </Flex>
                            </Link>
                        ) : (
                            <ProjectImage />
                        )}
                    </Flex>
                </FlexItem>
                <FlexItem md={8} col={12} className={classes.projectInfo}>
                    <Flex justifyContent="start" alignContent="center" gap={1} className={classes.header}>
                        <h4>
                            {project.name}
                        </h4>
                        {!!project.repoUrl ? (
                            <Link to={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <IconButton title={`Inspect the repo for ${project.name}`}>semantic-ui_github</IconButton>
                            </Link>
                        ) : undefined}
                        {!!project.url ? (
                            <Link to={project.url} target="_blank" rel="noopener noreferrer">
                                <IconButton title={`Visit ${project.name}`}>arrow_outward</IconButton>
                            </Link>
                        ) : undefined}
                    </Flex>
                    <hr/>
                    <p className={classes.stack}>Stack: {project.stack}</p>
                    <p>{project.description}</p>
                </FlexItem>
                <FlexItem col={11}>
                    <hr/>
                </FlexItem>
            </Flex>
        </FlexItem>
    );

    function ProjectImage() {
        return (
            <img src={project.photo} 
                className={classes.photo} 
                alt={`Project ${number} image`} 
                loading="lazy" 
            />
        );
    }
}
