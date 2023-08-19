import React, { useState, useEffect, useContext, useRef } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import PlayButton from "./PlayButton.js";
import PauseButton from "./PauseButton.js";
import SettingsButton from "./SettingsButton.js";
import SettingsContext from "../settings-components/SettingsContext.js";
import ThemeContext from "../toggler/ThemeContext.js";
import sound1 from "../../assets/beep1.mp3"
import sound2 from "../../assets/beep2.wav"

const red = "#f54e4e";
const green = "#4aec8c";

const Timer = (props) => {
  const settingsInfo = useContext(SettingsContext);
  const theme = useContext(ThemeContext)

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

    if (secondsLeftRef.current <= 10 && secondsLeftRef.current > 0) playBeep1()
  };

  const playBeep1 = () => {
    new Audio(sound1).play()
  }

  const playBeep2 = () => {
    new Audio(sound2).play()
  }

  useEffect(() => {
    const switchMode = () => {
      playBeep2()  
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (mode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    };

    secondsLeftRef.current =
      (mode === "work" ? settingsInfo.workMinutes : settingsInfo.breakMinutes) *
      60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo, mode]);

  const turnOnSettingsHandler = () => {
    props.onTurnOnSettings();
  };

  const startTimerHandler = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const stopTimerHandler = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  };

  const totalSeconds =
    (mode === "work" ? settingsInfo.workMinutes : settingsInfo.breakMinutes) *
    60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = `0${seconds}`;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: theme.darkMode === true ? "#fff" : "#000",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div style={{ marginTop: "30px" }}>
        {isPaused ? (
          <PlayButton onStartTimer={startTimerHandler} />
        ) : (
          <PauseButton onStopTimer={stopTimerHandler} />
        )}
      </div>
      <div>
        <SettingsButton onTurnOnSettings={turnOnSettingsHandler} />
      </div>
    </div>
  );
};

export default Timer;