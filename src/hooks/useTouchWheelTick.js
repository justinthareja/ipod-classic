import { useEffect } from "react";
import { useTouchWheel, TICK_STEP } from "../context/TouchWheelContext";

function useTouchWheelTick(onTick) {
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

export { useTouchWheelTick };
