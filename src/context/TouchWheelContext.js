import { useEffect, createContext, useContext, useState, useMemo } from "react";

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

function useTouchWheelTick(onTick) {
  // this needs to call onTick at the appropriate time
  const { angleChange, totalRotation, nextTick, setNextTick } = useTouchWheel();

  useEffect(() => {
    if (angleChange < 0 && totalRotation <= nextTick) {
      onTick({ direction: "anticlockwise" });
      setNextTick(totalRotation - TICK_STEP);
    } else if (angleChange > 0 && totalRotation >= nextTick) {
      onTick({ direction: "clockwise" });
      setNextTick(totalRotation + TICK_STEP);
    }
  }, [angleChange, totalRotation, nextTick, setNextTick, onTick]);
}

function useTouchWheelClick(onClick) {
  const context = useContext(TouchWheelContext);
  const { setHandleClick } = context;

  useEffect(() => {
    setHandleClick(() => onClick);
  }, [onClick, setHandleClick]);
}

export {
  TouchWheelProvider,
  useTouchWheel,
  useTouchWheelClick,
  useTouchWheelTick,
  TICK_STEP,
};
