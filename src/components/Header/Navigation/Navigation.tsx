import { Link } from "react-router-dom"

import { BACKEND_URL } from "src/axios/config"

import classes from './Navigation.module.scss'
import { Button } from "src/components/shared/Button/Button"
import { Flex } from "src/components/shared/Flex/Flex"

export const Navigation = () => {
    return (
        <nav>
            <Flex gap={2} className={classes.navigation} padding={0}>
                <Link to="/"><Button>Home</Button></Link>
                {/* <Link to="/music"><Button>Music</Button></Link> */}
                <Link to="/code"><Button>Code</Button></Link>
                <Link 
                    to={`${BACKEND_URL}/media/resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button>Resumé</Button>
                </Link>
                <Link to="mailto:jodysalani.dev@gmail.com" target="_blank" rel="noopenner noreferrer">
                    <Button>Contact</Button>
                </Link>
            </Flex>
        </nav>
    )
}