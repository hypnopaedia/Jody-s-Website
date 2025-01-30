import React from "react";

import classes from './Main.module.scss';

export const Main = () => {
    return (
        <main>
            <div className={classes.headerBuffer}></div>

            <div className={classes.appBackground}></div>
        </main>
    );
}
