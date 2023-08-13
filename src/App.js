import React, {useState} from 'react';

import './css/App.css';

import Timer from './components/timer-components/Timer'
import Settings from './components/settings-components/Settings.js'
import SettingsContext from './components/settings-components/SettingsContext.js'



function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    const turnOnSettingsHandler = () => {
      setShowSettings(true)
    }

    const turnOffSettingsHandler = () => {
        setShowSettings(false)
    }

    return (
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
    );
}

export default App;
