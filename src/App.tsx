import React, { useEffect } from 'react';

import { ThemeColorContext } from './theme/context/ThemeColorContext';
import { THEME_DATA } from './theme/constants';
import { ThemeData } from './theme/types';
import { useTheme } from './redux/Theme/hooks/useTheme';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

import './App.scss';

function App() {
  const theme = useTheme();
  const themeData: ThemeData = THEME_DATA[theme];
  useApplyTheme();

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

  function useApplyTheme() {
    return useEffect(() => {
      Object.values(themeData.vars).forEach((cssVar) => {
        const { key, value } = cssVar;
        document.documentElement.style.setProperty(`--${key}`, String(value) ?? 'none');
      })
    },[theme]);
  }
}

export default App;
