import { Routes, Route } from "react-router-dom";

import { Home } from "./Routes/Home/Home";
import { PostPage } from "./Routes/PostPage/PostPage";
// import { Music } from "./Routes/Music/Music";
import { Code } from "./Routes/Code/Code";
import { About } from "./Routes/About/About";

import classes from './Main.module.scss';
import { Flex } from "../shared/Flex/Flex";

export const Main = () => {
    return (
        <main>
            <div className={classes.headerBuffer}></div>

            <Flex className={classes.contentOuter} justifyContent="center">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<PostPage />} />
                    {/* <Route path="/music" element={<Music />} /> */}
                    <Route path="/code" element={<Code />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Flex>

            <div className={classes.appBackground}></div>
            <div className={classes.appBackgroundColor}></div>
        </main>
    );
}
