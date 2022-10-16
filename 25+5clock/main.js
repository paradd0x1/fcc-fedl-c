/*
 *
 * Utilities
 *
 */

// For getting milliseconds until timer ends
const getMs = (length) => {
  // Get start date
  const startDate = new Date(Date.now());
  // Get end date
  const endDate = new Date(Date.now());
  endDate.setMinutes(startDate.getMinutes() + length);
  // Get difference in milliseconds 
  const diffInMs = endDate.getTime() - startDate.getTime();
  
  return diffInMs;
}

// For converting to milliseconds when 
// minutes and seconds are given
const toMs = (mins, secs) => {
  const millisecond = 1000 // 1 second = 1000ms
  const second = 60 // 1 minute = 60s
  // Convert secs to ms 
  let secsToMs = secs * millisecond;
  // Convert mins to ms
  let minsToMs = mins * second * millisecond;
  // Return total ms 
  return (secsToMs + minsToMs);
}

/*
 *
 * Redux
 * Action Types
 *
 */

// Settings
const RESET_SETTINGS = 'RESET_SETTINGS';
const DECREMENT_BREAK_LENGTH = 'DECREMENT_BREAK_LENGTH';
const INCREMENT_BREAK_LENGTH = 'INCREMENT_BREAK_LENGTH';
const DECREMENT_SESSION_LENGTH = 'DECREMENT_SESSION_LENGTH';
const INCREMENT_SESSION_LENGTH = 'INCREMENT_SESSION_LENGTH';
const UPDATE_TIME_LEFT = 'UPDATE_TIME_LEFT';
const UPDATE_TIMER_LABEL = 'UPDATE_TIMER_LABEL';
const TOGGLE = 'TOGGLE';

// Session
const START_SESSION = 'START_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';
const PAUSE_SESSION = 'PAUSE_SESSION';
const RESET_SESSION = 'RESET_SESSION';
const STOP_SESSION = 'STOP_SESSION';
const UPDATE_FINISH_SESSION = 'UPDATE_FINISH_SESSION';

// Break
const START_BREAK = 'START_BREAK';
const UPDATE_BREAK = 'UPDATE_BREAK';
const PAUSE_BREAK = 'PAUSE_BREAK';
const RESET_BREAK = 'RESET_BREAK';
const STOP_BREAK = 'STOP_BREAK';
const UPDATE_FINISH_BREAK = 'UPDATE_FINISH_BREAK';

/*
 *
 * Action creators
 *
 */

// Settings
const resetSettings = () => { return { type: RESET_SETTINGS } }
const decBreakLength = () => { return { type: DECREMENT_BREAK_LENGTH } }
const incBreakLength = () => { return { type: INCREMENT_BREAK_LENGTH } }
const decSessionLength = () => { return { type: DECREMENT_SESSION_LENGTH } }
const incSessionLength = () => { return { type: INCREMENT_SESSION_LENGTH } }
const updateTimeLeft = (timeLeft) => {
  return {
    type: UPDATE_TIME_LEFT,
    timeLeft: timeLeft
  }
}
const updateTimerLabel = (timerLabel) => {
  return {
    type: UPDATE_TIMER_LABEL,
    timerLabel: timerLabel
  }
}
const toggle = () => { return { type: TOGGLE } }

// Session
const startSession = () => { return { type: START_SESSION } }
const updateSession = (currMinutes, currSeconds, remTime, sessionTimer) => {
  return {
    type: UPDATE_SESSION,
    currMinutes: currMinutes,
    currSeconds: currSeconds,
    remTime: remTime,
    sessionTimer: sessionTimer
  };
}
const resetSession = () => { return { type: RESET_SESSION } }
const stopSession = () => { return { type: STOP_SESSION } }
const pauseSession = () => { return { type: PAUSE_SESSION } }
const updateFinishSession = () => { return { type: UPDATE_FINISH_SESSION } }

// Break
const startBreak = () => { return { type: START_BREAK } }
const updateBreak = (currMinutes, currSeconds, remTime, breakTimer) => {
  return {
    type: UPDATE_BREAK,
    currMinutes: currMinutes,
    currSeconds: currSeconds,
    remTime: remTime,
    breakTimer: breakTimer
  };
}
const resetBreak = () => { return { type: RESET_BREAK } }
const stopBreak = () => { return { type: STOP_BREAK } }
const pauseBreak = () => { return { type: PAUSE_BREAK } }
const updateFinishBreak = () => { return { type: UPDATE_FINISH_BREAK } }


// Reset
const resetClock = () => {
  return (dispatch) => {
    // Reset session
    dispatch(resetSession());
    // Reset break
    dispatch(resetBreak());
    // Reset settings
    dispatch(resetSettings());
  }
}

/*
 *
 * Initial States 
 *
 */

// Settings
const settingsInitialState = {
  break_length: 5,
  session_length: 25,
  timer_label: 'Session',
  time_left: '25:00',
  audio: 'https://www.soundjay.com/misc/censor-beep-5.mp3',
  toggled: false,
  has_reset: true,
  timer_count: 0,
}

// Session
const sessionInitialState = {
  has_started: false,
  has_finished: false,
  has_paused: false,
  current_minutes: 0,
  current_seconds: 0,
  remaining_time: '',
  timer: null,
}

// Break
const breakInitialState = {
  has_started: false,
  has_finished: false,
  has_paused: false,
  current_minutes: 0,
  current_seconds: 0,
  remaining_time: '',
  timer: null
}

/*
 *
 * Reducers
 *
 */

// Settings
const settingsReducer = (state = settingsInitialState, action) => {
  // Clone state
  const newState = {...state};
  // Set lengths
  const breakLength = newState.break_length;
  const sessionLength = newState.session_length;
 
  switch(action.type) {
    case RESET_SETTINGS:
      return settingsInitialState;
      break;
    case DECREMENT_BREAK_LENGTH:
      if(newState.has_reset && breakLength > 1) {
        newState.break_length = breakLength - 1; 
      }
      return newState;
      break;
    case INCREMENT_BREAK_LENGTH:
      if(newState.has_reset && breakLength < 60) {
        newState.break_length = breakLength + 1; 
      }
      return newState;
      break;
    case DECREMENT_SESSION_LENGTH:
      if(newState.has_reset && sessionLength > 1) {
        const reducedSessionLength = sessionLength - 1;
        Object.assign(newState, {
          session_length: sessionLength - 1,
          time_left: `${reducedSessionLength < 10 ? '0' + reducedSessionLength : reducedSessionLength}:00`
        });
      };
      return newState;
      break;
    case INCREMENT_SESSION_LENGTH:
      if(newState.has_reset && sessionLength < 60) {
        const increasedSessionLength = sessionLength + 1;
        Object.assign(newState, {
          session_length: sessionLength + 1,
          time_left: `${increasedSessionLength < 10 ? '0' + increasedSessionLength : increasedSessionLength}:00`
        })
      }
      return newState;
      break;
    case UPDATE_TIME_LEFT:
      newState.time_left = action.timeLeft;
      return newState;
      break;
    case UPDATE_TIMER_LABEL:
      newState.timer_label = action.timerLabel;
      return newState;
      break;
    case TOGGLE:
      Object.assign(newState, {
        toggled: !newState.toggled,
        has_reset: false,
      })
      return newState;
      break;
    default:
      return state;
      break;
  }
}

// Session
const sessionReducer = (state = sessionInitialState, action) => {
  // Clone state
  const newState = {...state}
  
  switch(action.type) {
    case START_SESSION:
      Object.assign(newState, {
        has_started: true,
        has_finished: false,
        has_paused: false,
      })
      return newState;
      break;
    case UPDATE_SESSION:
      Object.assign(state, {
        current_minutes: action.currMinutes,
        current_seconds: action.currSeconds,
        remaining_time: action.remTime,
        timer: action.sessionTimer
      })
      console.log(`SESSION: ${JSON.stringify(state)}`);
      return state;
      break;
    case UPDATE_FINISH_SESSION:
      newState.has_finished = false;
      return newState;
      break;
    case STOP_SESSION:
      Object.assign(newState, {
        has_started: false,
        has_finished: true,
        timer: null
      })
      return newState;
      break;
    case PAUSE_SESSION:
      Object.assign(newState, {
        has_paused: true,
        timer: null
      })
      return newState;
      break;
    case RESET_SESSION:
      return sessionInitialState;
      break;
    default:
      return state;
  }
}

// Break 
const breakReducer = (state = breakInitialState, action) => {
  // Clone state
  const newState = {...state}
  
  switch(action.type) {
    case START_BREAK:
      Object.assign(newState, {
        has_started: true,
        has_finished: false,
        has_paused: false,
      })
      return newState;
      break;
    case UPDATE_BREAK:
      Object.assign(newState, {
        current_minutes: action.currMinutes,
        current_seconds: action.currSeconds,
        remaining_time: action.remTime,
        timer: action.breakTimer
      })
      console.log(`BREAK: ${JSON.stringify(newState)}`);
      return newState;
      break;
    case UPDATE_FINISH_BREAK:
      newState.has_finished = false;
      return newState;
      break;
    case STOP_BREAK:
      Object.assign(newState, {
        has_started: false,
        has_finished: true,
        timer: null
      })
      return newState;
      break;
    case PAUSE_BREAK:
      Object.assign(newState, {
        has_paused: true,
        timer: null
      })
      return newState;
      break;
    case RESET_BREAK:
      return breakInitialState;
      break;
    default:
      return state;
  }
}

// Root reducer
const clockReducer = Redux.combineReducers({
  settings: settingsReducer,
  session: sessionReducer,
  break: breakReducer
});

// Store
const store = Redux.createStore(clockReducer, Redux.applyMiddleware(ReduxThunk));

/*
 *
 * React
 *
 */ 
const Clock = (props) => {
  const state = props.clock;
  
  const audioRef = React.useRef('audio');
  
  const [sessionTimer, setSession] = React.useState(null);
  
  const [breakTimer, setBreak] = React.useState(null);
  
  const [sessionLength, setSessionLength] = React.useState(state.settings.session_length);
  
  const [breakLength, setBreakLength] = React.useState(state.settings.break_length);
  
  const [sessionMins, getSessionMins] = React.useState(state.session.current_minutes);
  
  const [sessionSecs, getSessionSecs] = React.useState(state.session.current_seconds);
  
  const [breakMins, getBreakMins] = React.useState(state.break.current_minutes);
  
  const [breakSecs, getBreakSecs] = React.useState(state.break.current_seconds);
  
  const [fromBreak, sayFromBreak] = React.useState(false);
  
  const [timeLeft, getTimeLeft] = React.useState('');
  
  
  React.useEffect(() => {    
    setSessionLength(state.settings.session_length);
    setBreakLength(state.settings.break_length);
    
    getSessionMins(state.session.current_minutes);
    getSessionSecs(state.session.current_seconds);
    
    getBreakMins(state.break.current_minutes);
    getBreakSecs(state.break.current_seconds);
    
    const sessionIsDone = state.session.has_finished;
    const breakIsDone = state.break.has_finished;
    const toggled = state.settings.toggled;
    const inSession = state.settings.timer_label == 'Session' ? 'Session' : null;
    const inBreak = state.settings.timer_label == 'Break' ? 'Break' : null;
    
    if (!toggled) {
      // Pause audio when clock is not toggled
      audioRef.current.pause(); 
    } else if ( ((sessionIsDone && !inSession) || (breakIsDone && !inBreak)) && toggled ) {
      // Play audio when session or break has ended
      console.log(`Session is done: ${sessionIsDone}, InSession: ${inSession}`);
      console.log(`Break is done: ${breakIsDone}, InBreak: ${inBreak}`);
      console.log(`Toggled: ${toggled}`);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } 
    
    getTimeLeft(state.settings.time_left);
  })
  
  function startSessionTimer() {   
    const sessionIsDefault = (sessionMins == 0 && sessionSecs == 0) ? true : false;
    
    // Update timer label
    props.updateTimerLabel('Session');
    
    // Start session
    props.startSession();
    
    // Get milliseconds to time end
    const diffInMs = sessionIsDefault ? getMs(sessionLength) : toMs(sessionMins, sessionSecs);
    
    // Set remaining time
    let rem = fromBreak == 1 ? diffInMs : diffInMs - 1000;
    
    const sessionTimer = setInterval(() => {
      // Proceed if remaining time is greater than 0
      if(rem >= 0) {
        // Make new date to represent remaining time
        const runningDate = new Date(rem);
        // Get minutes and seconds of remaining time
        const currMinutes = runningDate.getMinutes();
        const currSeconds = runningDate.getSeconds();
        // Get time left using minutes-left and seconds-left
        const timeLeft = `${currMinutes < 10 ? '0' + currMinutes : currMinutes}:${currSeconds < 10 ? '0' + currSeconds : currSeconds}`;
        // Update session
        props.updateSession(currMinutes, currSeconds, timeLeft, sessionTimer);
        // Update time left
        props.updateTimeLeft(timeLeft);
        // Get remaining time
        rem -= 1000;
      } else {
        // Stop session
        props.stopSession();
        // Start break
        setBreak(startBreakTimer(sessionLength, breakLength));
        // Update session finish
        props.updateFinishSession();
        // Clear session timer
        clearInterval(sessionTimer);
      }
    }, 1000)
    
    return sessionTimer;
  }
  
  function startBreakTimer(sessionLength, breakLength) {
    const breakIsDefault = (breakMins == 0 && breakSecs == 0) ? true : false;
    
    // Update timer label
    props.updateTimerLabel('Break');
    
    // Start session
    props.startBreak();
    
    // Get milliseconds to time end
    const diffInMs = breakIsDefault ? getMs(breakLength) : toMs(breakMins, breakSecs);
    
    let rem = diffInMs;
    
    const breakTimer = setInterval(() => {
      // Proceed if remaining time is greater than 0
      if(rem >= 0) {
        // Make new date to represent remaining time
        const runningDate = new Date(rem);
        // Get minutes and seconds of remaining time
        const currMinutes = runningDate.getMinutes();
        const currSeconds = runningDate.getSeconds();
        // Get time left using minutes-left and seconds-left
        const timeLeft = `${currMinutes < 10 ? '0' + currMinutes : currMinutes}:${currSeconds < 10 ? '0' + currSeconds : currSeconds}`;
        // Update break
        props.updateBreak(currMinutes, currSeconds, timeLeft, breakTimer);
        // Update time left
        props.updateTimeLeft(timeLeft);
        // Get remaining time
        rem -= 1000;
      } else {
        // Stop break
        props.stopBreak();
        // Start session
        sayFromBreak(val => !val);
        setSession(startSessionTimer());
        // Update session finish
        props.updateFinishBreak();
        // Clear session timer
        clearInterval(breakTimer);
      }
    }, 1000)
    
    return breakTimer;
  }
  
  function handleStartStop() {
    const toggled = state.settings.toggled;
    const timerLabel = state.settings.timer_label;
    
    const sessionHasStarted = state.session.has_started;
    const sessionHasPaused = state.session.has_paused;
    
    const breakHasStarted = state.break.has_started;
    const breakHasPaused = state.break.has_paused;
    
    switch(timerLabel) {
      case 'Session':
        if ( sessionTimer == null ) {
          // Start Session
          setSession(startSessionTimer());
          console.log('Session started.');
        } else if ( sessionTimer != null ) {
          // Pause Session
          clearInterval(sessionTimer);
          setSession(null);
          props.pauseSession();
          console.log('Session paused.');
        }
        break;
      case 'Break':
        if ( breakTimer == null ) {
          // Start Break
          setBreak(startBreakTimer());
          console.log('Break started.');
        } else if ( breakTimer != null ) {
          // Pause Break
          clearInterval(breakTimer);
          setBreak(null);
          props.pauseBreak();
          console.log('Break paused.');
        }
        break;
      default:
        break;
    }

    if (!toggled) {
      // Toggle 
      props.toggle();
    }
  }
  
  function handleReset() {
    // Stop beep
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    console.log('Beep stopped.');
    // Stop all timers
    clearInterval(sessionTimer);
    clearInterval(breakTimer);
    setSession(null);
    setBreak(null);
    console.log('Timers stopped.');
    // Reset
    props.resetClock();
    console.log('Reverted to initial settings.');
  }
  
  return(
    <div className='container'>
      {/* Heading */}
      <div className='row text-center'><h1>25+5 Clock</h1></div>
      {/* Break Length and Session Length Controls */}
      <div className='row mt-2'>
        <div className='col-6 text-center d-flex flex-column'>
          <span id='break-label'>Break Length</span>
          <div className='container d-flex gap-2 justify-content-center align-items-center mt-2'>
            <DownArrow downArrowId='break-decrement' width='25' height='25' handler={props.decBreakLength} />
            <span id='break-length'>{breakLength}</span>
            <UpArrow upArrowId='break-increment' width='25' height='25' handler={props.incBreakLength} />
          </div>
        </div>
        <div className='col-6 text-center d-flex flex-column'>
          <span id='session-label'>Session Length</span>
          <div className='container d-flex gap-2 justify-content-center align-items-center mt-2'>
            <DownArrow downArrowId='session-decrement' width='25' height='25' handler={props.decSessionLength} />
            <span id='session-length'>{sessionLength}</span>
            <UpArrow upArrowId='session-increment' width='25' height='25' handler={props.incSessionLength} />
          </div>
        </div>
      </div>
      {/* Session Display */}
      <div className='row mt-2'>
        <div className='col-12 d-flex justify-content-center align-items-center'>
          <div className='rounded-pill border border-4 border-secondary p-5 d-flex flex-column align-items-center border border-info'>
            <span className='p-2' id='timer-label'>{state.settings.timer_label}</span>
            <span className='fw-bold' id='time-left'>{timeLeft}</span>
          </div>
        </div>
      </div>
      {/* Audio (Hidden) */}
      <audio id='beep' ref={audioRef} src={state.settings.audio}></audio>
      {/* Session Controls */}
      <div className='row mt-3'>
        <div className='d-flex justify-content-center'>
          <StartStop startStopId='start_stop' width='25' height='25' handler={handleStartStop} />
          <Reset resetId='reset' width='25' height='25' handler={handleReset} />
        </div>
      </div>
      {/* Designer Details */}
      <div className='row mt-4'>
        <div className='d-flex flex-column align-items-center' id='designer-details'>
          <span>Designed and Coded by</span>
          <span>Paolo Linaac</span>
        </div>
      </div>
    </div>
  );
};

const DownArrow = (props) => {
  return(
    <button class='btn btn-link text-dark btn-sm' onClick={props.handler} id={props.downArrowId}>
      <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
      </svg>
    </button>
  );
}

const UpArrow = (props) => {
  return(
    <button class='btn btn-link text-dark btn-sm' onClick={props.handler} id={props.upArrowId}>
      <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
      </svg>
    </button>
  );
}

const StartStop = (props) => {
  return(
    <button class='btn btn-link text-dark btn-sm' onClick={props.handler} id={props.startStopId}>
      <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
    </button>
  );
}

const Reset = (props) => {
  return(
    <button class='btn btn-link text-dark btn-sm' onClick={props.handler} id={props.resetId}>
      <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
      </svg>
    </button>
  );
}

/*
 *
 * React Redux
 *
 */

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = (state) => {
  return { clock: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Settings
    
    toggle: () => { dispatch(toggle()) },
    
    decBreakLength: (sessionIsDone, breakIsDone) => { 
      dispatch(decBreakLength(sessionIsDone, breakIsDone))
    },
    
    incBreakLength: (sessionIsDone, breakIsDone) => { 
      dispatch(incBreakLength(sessionIsDone, breakIsDone))
    },
    
    decSessionLength: (sessionIsDone, breakIsDone) => { 
      dispatch(decSessionLength(sessionIsDone, breakIsDone))
    },
    
    incSessionLength: (sessionIsDone, breakIsDone) => { 
      dispatch(incSessionLength(sessionIsDone, breakIsDone))
    },

    updateTimerLabel: (timerLabel) => { dispatch(updateTimerLabel(timerLabel)) },
    
    updateTimeLeft: (timeLeft) => { dispatch(updateTimeLeft(timeLeft)) },
    
    // Session
    
    startSession: () => { dispatch(startSession()) },
    
    stopSession: () => { dispatch(stopSession()) },
    
    updateSession: (currMinutes, currSeconds, remTime, sessionTimer) => { 
      dispatch(updateSession(currMinutes, currSeconds, remTime, sessionTimer)) 
    },
    
    updateFinishSession: () => { dispatch(updateFinishSession()) },
    
    pauseSession: () => { dispatch(pauseSession()) },
    
    // Break
    
    startBreak: () => { dispatch(startBreak()) },
    
    stopBreak: () => { dispatch(stopBreak()) },
    
    updateBreak: (currMinutes, currSeconds, remTime, breakTimer) => { 
      dispatch(updateBreak(currMinutes, currSeconds, remTime, breakTimer)) 
    },
    
    updateFinishBreak: () => { dispatch(updateFinishBreak()) },
    
    pauseBreak: () => { dispatch(pauseBreak()) },
    
    // Reset
    
    resetClock: () => { dispatch(resetClock()) },
  };
};

const ConnectedClock = connect(mapStateToProps, mapDispatchToProps)(Clock);

const PackagedClock = () => {
  return(
    <Provider store={store}>
      <ConnectedClock />
    </Provider>
  );
}

ReactDOM.render(<PackagedClock />, document.getElementById('clock'));
