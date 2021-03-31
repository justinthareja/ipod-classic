import { useEffect } from "react";
import { useControls } from "../context/ControlsContext";

export function useNextClick(handler) {
  const { setHandleNext } = useControls();

  useEffect(() => {
    setHandleNext(() => handler);

    return () => setHandleNext(null);
  }, [handler, setHandleNext]);
}
