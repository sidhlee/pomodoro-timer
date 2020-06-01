import React, { useReducer, useEffect, useRef } from 'react';

import TimerLengthControl from './components/TimerLengthControl';
import TimeDisplay from './components/TimeDisplay';
import VscFooter from './components/VscFooter';
import Controllers from './components/Controllers';
import {
  timerReducer,
  initialTimerState,
  TimerMode,
} from './components/timerReducer';
const beep = require('./audio/beep.mp3');

function App() {
  const [timerState, dispatch] = useReducer(timerReducer, initialTimerState);
  const idRef = useRef<number | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    sessionLength,
    breakLength,
    isRunning,
    timerMode,
    secondsLeft,
  } = timerState;

  useEffect(() => {
    const tick = () => {
      dispatch({ type: 'TIMER_TICK' });
    };
    if (isRunning) {
      idRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(idRef.current);
    }
    return () => clearInterval(idRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0 && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  }, [secondsLeft]);

  const handleReset = () => {
    dispatch({ type: 'TIMER_RESET' });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // TODO: use react-popper to open error message when users try to change ongoing timer length
  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>pomodoro timer</h1>
        </header>
        <p id="timer-label">{TimerMode[timerMode]}</p>
        <TimeDisplay secondsLeft={secondsLeft} />
        <section className="timer-length">
          <TimerLengthControl
            name="break"
            length={breakLength}
            handleDecreaseClick={() => {
              dispatch({ type: 'BREAK_DECREMENT' });
            }}
            handleIncreaseClick={() => {
              dispatch({ type: 'BREAK_INCREMENT' });
            }}
          />
          <TimerLengthControl
            name="session"
            length={sessionLength}
            handleDecreaseClick={() => {
              dispatch({ type: 'SESSION_DECREMENT' });
            }}
            handleIncreaseClick={() => {
              dispatch({ type: 'SESSION_INCREMENT' });
            }}
          />
        </section>
        <Controllers
          isRunning={isRunning}
          handleStartStopClick={() => {
            dispatch({ type: 'START_STOP' });
          }}
          handleResetClick={handleReset}
        />
        <VscFooter secondsLeft={secondsLeft} mode={TimerMode[timerMode]} />
      </div>
      <audio id="beep" preload="auto" src={beep} ref={audioRef} />
    </div>
  );
}

export default App;
