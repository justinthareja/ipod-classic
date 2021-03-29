import { useContext, createContext, useState, useMemo } from "react";

const ControlsContext = createContext();

export function ControlsProvider(props) {
  const [handleMenu, setHandleMenu] = useState(null);
  const [handlePlayPause, setHandlePlayPause] = useState(null);
  const [handleNext, setHandleNext] = useState(null);
  const [handlePrevious, setHandlePrevious] = useState(null);

  const value = useMemo(
    () => ({
      handleMenu,
      setHandleMenu,
      handlePlayPause,
      setHandlePlayPause,
      handleNext,
      setHandleNext,
      handlePrevious,
      setHandlePrevious,
    }),
    [handleMenu, handlePlayPause, handleNext, handlePrevious]
  );

  return <ControlsContext.Provider value={value} {...props} />;
}
export function useControls() {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error("Must useControls within <ControlsProvider>");
  }
  return context;
}
