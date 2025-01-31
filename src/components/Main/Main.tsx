import { Routes, Route } from "react-router-dom";

import { Flex } from "../shared/Flex/Flex";
import { Home } from "./Routes/Home/Home";
import { Music } from "./Routes/Music/Music";
import { Code } from "./Routes/Code/Code";

import classes from './Main.module.scss';

export const Main = () => {
    return (
        <main>
            <div className={classes.headerBuffer}></div>
            <div className={classes.appBackground}></div>

            <Flex className={classes.contentOuter} justifyContent="center">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/code" element={<Code />} />
                </Routes>
            </Flex>

        </main>
    );
}
