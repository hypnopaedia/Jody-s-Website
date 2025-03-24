import { Link } from "react-router-dom"

import clsx from "clsx"
import classes from './Navigation.module.scss'
import { Button } from "src/components/shared/Button/Button"
import { Flex } from "src/components/shared/Flex/Flex"

export const Navigation = () => {
    return (
        <nav>
            <Flex className={clsx(classes.navigation, 'gap-2', 'gap-md-3')} padding={0}>
                <Link to="/"><Button>Home</Button></Link>
                <Link to="/music"><Button>Music</Button></Link>
                <Link to="/code"><Button>Code</Button></Link>
                <a // don't use <Link> here ... HashRouter problems
                    href={`/media/resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button>Resumé</Button>
                </a>
                <Link to="mailto:jodysalani.dev@gmail.com" target="_blank" rel="noopenner noreferrer">
                    <Button>Contact</Button>
                </Link>
                <Link to="/about"><Button>About</Button></Link>
            </Flex>
        </nav>
    )
}