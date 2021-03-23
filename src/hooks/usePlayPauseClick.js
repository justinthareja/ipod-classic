import { useEffect } from "react";
import { useControls } from "../context/ControlsContext";

export function usePlayPauseClick(handler) {
  const { setHandlePlayPause } = useControls();

  useEffect(() => {
    setHandlePlayPause(() => handler);

    return () => setHandlePlayPause(null);
  }, [handler, setHandlePlayPause]);
}
