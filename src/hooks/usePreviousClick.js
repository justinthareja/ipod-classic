import { useEffect } from "react";
import { useControls } from "../context/ControlsContext";

export function usePreviousClick(handler) {
  const { setHandlePrevious } = useControls();

  useEffect(() => {
    setHandlePrevious(() => handler);

    return () => setHandlePrevious(null);
  }, [handler, setHandlePrevious]);
}
