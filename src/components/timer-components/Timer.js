import React, {useState, useEffect, useContext} from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import PlayButton from './PlayButton.js'
import PauseButton from './PauseButton.js'
import SettingsButton from './SettingsButton.js'
import SettingsContext from '../settings-components/SettingsContext.js'

const red = "#f54e4e"
// const green = "4aec8c"

const Timer = (props) => {
    const settingsInfo = useContext(SettingsContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0)

    const switchMode = () => {
        const nextMode = mode === 'work' ? 'break' : "work";
        const nextSeconds = (mode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60
        setMode(nextMode);
        setSecondsLeft(nextSeconds)
    }

    const tick = () => {
        setSecondsLeft(secondsLeft - 1)
    }

    const initTimer = () => {
        setSecondsLeft(settingsInfo.workMinutes * 60)
    }

    useEffect(() => {
        initTimer();

        setInterval(() => {
            if (isPaused) {
                return;
            }
            
            if (secondsLeft === 0) {
                return switchMode()
            }
        }, 1000)
    }, [settingsInfo]);

    const percentage = 66;

    const turnOnSettingsHandler = () => {
        props.onTurnOnSettings()
    }

    return (<div>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: red,
                        trailColor:'rgba(255,255,255,.2)',
                    })} 
                />
                <div style={{marginTop:'30px'}}>
                    {isPaused ? <PlayButton/> : <PauseButton/>}
                </div>
                <div>
                    <SettingsButton onTurnOnSettings={turnOnSettingsHandler}/>
                </div>
            </div>
    )
}

export default Timer