import { Link } from "react-router-dom";

import { useProject } from "src/redux/Code/hooks/useProject"

import clsx from "clsx";
import classes from './Project.module.scss';
import { Flex } from "src/components/shared/Flex/Flex"
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem"
import { IconButton } from "src/components/shared/Button/IconButton";

type Props = {
    index: number
}

export const Project = ({ index }: Props) => {
    const project = useProject(index);

    return (
        <FlexItem col={12} className={clsx(classes.project, 'p-0', 'fade-in-from-right')}>
            <Flex justifyContent="center" flexWrap="wrap" className="p-0">
                <FlexItem md={2} col={3} className={clsx(classes.photoWrapper,'d-none d-md-block')}>
                    <Flex justifyContent="center" alignItems="center" className={clsx(classes.photoFlex)}>
                        {!!project.url ? (
                            <Link to={project.url} target="_blank" rel="noopener noreferrer">
                                <Flex justifyContent="center" alignItems="center" className="p-0">
                                    <img src={project.photo} className={classes.photo} alt={`Project ${index} image`} />
                                </Flex>
                            </Link>
                        ) : (
                            <img src={project.photo} loading="lazy" className={classes.photo} alt={`Project ${index} image`} />
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
    )
}