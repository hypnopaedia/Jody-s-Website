import { ThemeData } from "../types";

export const LIGHT_THEME: ThemeData = {
    mainContentColor: 'primary',
    vars: {
        primaryColor: {
            key: 'primary-color',
            value: 'slateblue'
        },
        secondaryColor: {
            key: 'secondary-color',
            value: 'white'
        },
        textColor: {
            key: 'text-color',
            value: '#15141A'
        },
        detailTextColor: {
            key: 'detail-text-color',
            value: 'dimgray',
        },
        
        background: {
            key: 'background',
            value: 'url(https://s13.gifyu.com/images/b2bMf.jpg)'
        },
        backgroundOpacity: {
            key: 'background-opacity',
            value: 0.4
        },
        backgroundSize: {
            key: 'background-size',
            value: '100vw calc(100vh - 100px)'
        },
        backgroundColor: {
            key: 'background-color',
            value: 'white'
        },

        headerGradient: {
            key: 'header-gradient',
            value: 'linear-gradient(to bottom right,darkorchid,slateblue,slateblue,slateblue,slateblue,slateblue,slateblue,darkorchid)'
        },
    }
}
