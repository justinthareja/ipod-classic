import { createContext, useContext, useReducer } from "react";

const STATUS_PLAY = "StatusContext.play";
const STATUS_PAUSE = "StatusContext.pause";
const STATUS_STOP = "StatusContext.stop";

function reducer(currentState, action) {
  switch (action) {
    case STATUS_PLAY:
      return "playing";
    case STATUS_PAUSE:
      return "paused";
    case STATUS_STOP:
      return "stopped";
    default:
      return currentState;
  }
}

const initialState = "stopped";
const StatusContext = createContext();

export function StatusProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const play = () => dispatch(STATUS_PLAY);
  const pause = () => dispatch(STATUS_PAUSE);
  const stop = () => dispatch(STATUS_STOP);

  return (
    <StatusContext.Provider value={{ state, play, pause, stop }} {...props} />
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("Must call useStatus() within <StatusProvider>");
  }
  return context;
}
