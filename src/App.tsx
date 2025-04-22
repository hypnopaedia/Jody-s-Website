import React from 'react';

import { ThemeColorContext } from './theme/context/ThemeColorContext';
import { THEME_DATA } from './theme/constants';
import { ThemeData } from './theme/types';

import { useSetThemeCssVars } from './hooks/useSetThemeCssVars';
import { useTheme } from './redux/Theme/hooks/useTheme';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

import './App.scss';

function App() {
  const theme = useTheme();
  const themeData: ThemeData = THEME_DATA[theme];
  
  useSetThemeCssVars();

  return (
    <>
        <ThemeColorContext.Provider value='secondary'>
          <Header />
        </ThemeColorContext.Provider>
        <ThemeColorContext.Provider value={themeData.mainContentColor}>
          <Main />
        </ThemeColorContext.Provider>
    </>
  );
}

export default App;
