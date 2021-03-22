import { createContext, useContext, useState, useMemo } from "react";

const TouchWheelContext = createContext();

// degrees needed to scroll before a tick
const TICK_STEP = 35;

function TouchWheelProvider(props) {
  const [angleChange, setAngleChange] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [nextTick, setNextTick] = useState(TICK_STEP);
  const [handleClick, setHandleClick] = useState(null);
  const value = useMemo(
    () => ({
      angleChange,
      setAngleChange,
      totalRotation,
      setTotalRotation,
      nextTick,
      setNextTick,
      handleClick,
      setHandleClick,
    }),
    [angleChange, totalRotation, nextTick, handleClick]
  );

  return <TouchWheelContext.Provider value={value} {...props} />;
}

function useTouchWheel() {
  const context = useContext(TouchWheelContext);
  if (!context) {
    throw new Error(
      "useTouchWheel() must be called within <TouchWheelProvider>"
    );
  }
  return context;
}

export { TouchWheelProvider, useTouchWheel, TICK_STEP };
