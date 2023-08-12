import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import PlayButton from './PlayButton.js'
import PauseButton from './PauseButton.js'
import SettingsButton from './SettingsButton.js'

const red = "#f54e4e"
const green = "4aec8c"

const Timer = (props) => {
    const percentage = 66;

    const turnOnSettingsHandler = () => {
        props.turnOnSettings()
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
                    <PlayButton />
                    <PauseButton />
                </div>
                <div>
                    <SettingsButton onTurnOnSettings={turnOnSettingsHandler}/>
                </div>
            </div>
    )
}

export default Timer