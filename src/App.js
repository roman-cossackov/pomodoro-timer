import React, {useState} from 'react';

import './App.css';

import Timer from './components/timer-components/Timer'
import Settings from './components/settings-components/Settings.js'



function App() {

    const [showSettings, setShowSettings] = useState(false)

    const turnOnSettingsHandler = () => {
      setShowSettings(true)
    }

    return (
        <main>
            {showSettings ? <Settings /> : <Timer onTurnOnSettings={turnOnSettingsHandler}/>}
        </main>
    );
}

export default App;
