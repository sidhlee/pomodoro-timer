export enum TimerMode {
  Session,
  Break,
}

export type TimerState = {
  /** break length in minutes */
  breakLength: number;
  /** session length in minutes */
  sessionLength: number;
  secondsLeft: number;
  isRunning: boolean;
  timerMode: TimerMode;
  started: boolean;
};

export const initialTimerState: TimerState = {
  breakLength: 5,
  sessionLength: 25,
  secondsLeft: 25 * 60,
  isRunning: false,
  timerMode: TimerMode.Session,
  started: false,
};

export type TimerAction =
  | { type: 'BREAK_INCREMENT' }
  | { type: 'BREAK_DECREMENT' }
  | { type: 'SESSION_INCREMENT' }
  | { type: 'SESSION_DECREMENT' }
  | { type: 'START_STOP' }
  | { type: 'TIMER_RESET' }
  | { type: 'TIMER_TICK' };

const incrementBreak = (state: TimerState, action: TimerAction) => {
  if (state.breakLength >= 60) return state;
  if (state.timerMode === TimerMode.Break) {
    if (state.started) return state;
    return {
      ...state,
      secondsLeft: state.secondsLeft + 60,
      breakLength: state.breakLength + 1,
    };
  }
  return {
    ...state,
    breakLength: state.breakLength + 1,
  };
};

const decrementBreak = (state: TimerState, action: TimerAction) => {
  if (state.breakLength <= 1) return state;
  if (state.timerMode === TimerMode.Break) {
    if (state.started) return state;
    return {
      ...state,
      secondsLeft: state.secondsLeft - 60,
      breakLength: state.breakLength - 1,
    };
  }
  return {
    ...state,
    breakLength: state.breakLength - 1,
  };
};
const incrementSession = (state: TimerState, action: TimerAction) => {
  if (state.sessionLength >= 60) return state;
  if (state.timerMode === TimerMode.Session) {
    //  Only allow users to change length after reset
    if (state.started) return state;
    return {
      ...state,
      secondsLeft: state.secondsLeft + 60,
      sessionLength: state.sessionLength + 1,
    };
  }
  return {
    ...state,
    sessionLength: state.sessionLength + 1,
  };
};

const decrementSession = (state: TimerState, action: TimerAction) => {
  if (state.sessionLength <= 1) return state;
  if (state.timerMode === TimerMode.Session) {
    // if timer is running, don't allow users to change the length of the current mode
    if (state.started) return state;
    return {
      ...state,
      secondsLeft: state.secondsLeft - 60,
      sessionLength: state.sessionLength - 1,
    };
  }
  return {
    ...state,
    sessionLength: state.sessionLength - 1,
  };
};

const startStop = (state: TimerState, action: TimerAction) => {
  return {
    ...state,
    isRunning: !state.isRunning,
    started: true,
  };
};

const tick = (state: TimerState, action: TimerAction) => {
  if (state.secondsLeft > 0) {
    return {
      ...state,
      secondsLeft: state.secondsLeft - 1,
    };
  }
  // if time is up
  if (state.timerMode === TimerMode.Session) {
    return {
      ...state,
      timerMode: TimerMode.Break,
      secondsLeft: state.breakLength * 60,
    };
  }
  if (state.timerMode === TimerMode.Break) {
    return {
      ...state,
      timerMode: TimerMode.Session,
      secondsLeft: state.sessionLength * 60,
    };
  }
  return state;
};

const reset = (state: TimerState, action: TimerAction) => {
  return initialTimerState;
};

export const timerReducer = (
  state: TimerState,
  action: TimerAction
): TimerState => {
  switch (action.type) {
    case 'BREAK_INCREMENT':
      return incrementBreak(state, action);
    case 'BREAK_DECREMENT':
      return decrementBreak(state, action);
    case 'SESSION_INCREMENT':
      return incrementSession(state, action);
    case 'SESSION_DECREMENT':
      return decrementSession(state, action);
    case 'START_STOP':
      return startStop(state, action);
    case 'TIMER_TICK':
      return tick(state, action);
    case 'TIMER_RESET':
      return reset(state, action);
    default:
      return state;
  }
};
