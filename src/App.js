import React, {useState} from 'react';

import { createGlobalStyle } from 'styled-components';

import './css/App.css';

import Timer from './components/timer-components/Timer'
import Settings from './components/settings-components/Settings.js'
import SettingsContext from './components/settings-components/SettingsContext.js'
import ThemeContext from './components/toggler/ThemeContext';
import Toggler from './components/toggler/Toggler.js'



function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    const [darkMode, setDarkMode] = useState(true)

    const turnOnSettingsHandler = () => {
      setShowSettings(true)
    }

    const turnOffSettingsHandler = () => {
        setShowSettings(false)
    }

    const GlobalStyle = createGlobalStyle`
        body {
            background-color: ${darkMode === true ? "#352F44" : "#E6CCBE"};
            color: ${darkMode === true ? "#fff" : "#000"};
        }
        button {
            color: ${darkMode === true ? "#fff" : "#000"};
        }
          button.with-text {
            background-color: ${darkMode === true ? "rgba(255,255,255,0.1)" : "#A07178"};
          }  
    `

    return (
        <ThemeContext.Provider value={{
            darkMode,
            setDarkMode
        }}>
            <GlobalStyle />
            <Toggler />
                <main>
                    <SettingsContext.Provider value={{
                        workMinutes,
                        breakMinutes,
                        setWorkMinutes,
                        setBreakMinutes,
                    }}>
                        {showSettings ? <Settings onTurnOffSettings={turnOffSettingsHandler}/> : <Timer onTurnOnSettings={turnOnSettingsHandler}/>}
                    </SettingsContext.Provider>
                </main>
        </ThemeContext.Provider>
    );
}

export default App;
