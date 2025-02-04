import { ThemeData } from "../types";

export const DARK_THEME: ThemeData = {
    mainContentColor: 'secondary',
    vars: {
        primaryColor: {
            key: 'primary-color',
            value: '#2b2937'
        },
        secondaryColor: {
            key: 'secondary-color',
            value: 'white'
        },
        textColor: {
            key: 'text-color',
            value: 'white'
        },
        linkColor: {
            key: 'link-color',
            value: 'deepskyblue',
        },
        detailTextColor: {
            key: 'detail-text-color',
            value: 'lightgray',
        },

        background: {
            key: 'background',
            value: 'url(https://s13.gifyu.com/images/b2Mft.jpg)'
        },
        backgroundSize: {
            key: 'background-size',
            value: '90vw auto'
        },
        backgroundFilter: {
            key: 'background-filter',
            value: 'contrast(0.9)'
        },
        backgroundOpacity: {
            key: 'background-opacity',
            value: 0.35
        },
        backgroundColor: {
            key: 'background-color',
            value: '#2b2937'
        },

        // background: 'url(https://s13.gifyu.com/images/b2bMf.jpg)',
        // backgroundSize: '100vw calc(100vh - 100px)',
        // backgroundFilter: 'invert()',
        // backgroundOpacity: 0.85,

        headerGradient: {
            key: 'header-gradient',
            value: 'linear-gradient(to bottom right,#211f1f,#2b2937,#2b2937,#211f1f)'
        },
    }
}
