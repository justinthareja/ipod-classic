import { useEffect, useCallback } from "react";
import { useTouchWheel } from "../context/TouchWheelContext";

function useTouchWheelClick(onClick) {
  const { setHandleClick } = useTouchWheel();
  const clickHandler = useCallback(() => onClick, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setHandleClick(clickHandler);

    return function cleanup() {
      setHandleClick(() => {});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export { useTouchWheelClick };
