import { useEffect } from "react";
import { useTouchWheel } from "../context/TouchWheelContext";

// this hook is used to register a click handler to the touch wheel button
// the onClick function passed a parameter likely depends on local component
// state. in order to avoid an infinite re-render cycle, the onClick function
// must be memoized using React.useCallback before being passed in
function useTouchWheelClick(onClick) {
  const { setHandleClick } = useTouchWheel();

  useEffect(() => {
    setHandleClick(() => onClick);

    return function cleanup() {
      setHandleClick(() => {});
    };
  }, [setHandleClick, onClick]);
}

export { useTouchWheelClick };
