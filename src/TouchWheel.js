import { throttle } from "lodash";
import { useEffect, createContext, useContext, useState, useMemo } from "react";

// degrees needed to scroll before a tick
const TICK_STEP = 35;
const TouchWheelContext = createContext();

export default function TouchWheel() {
  const context = useContext(TouchWheelContext);
  const {
    setAngleChange,
    setNextTick,
    totalRotation,
    setTotalRotation,
    handleClick,
  } = context;

  const [mouseDown, setMouseDown] = useState(false);
  const [lastCoords, setLastCoords] = useState([0, 0]);

  const handleMouseDown = (e) => {
    setMouseDown(true);
  };

  const handleMouseUp = (e) => {
    setMouseDown(false);
    setTotalRotation(0);
    setLastCoords([0, 0]);
    setNextTick(TICK_STEP);
    setAngleChange(0);
  };

  const handleMouseOut = (e) => {
    setMouseDown(false);
    setTotalRotation(0);
    setLastCoords([0, 0]);
    setNextTick(TICK_STEP);
    setAngleChange(0);
  };

  const handleMouseMove = (e) => {
    if (e.target.matches(".js-wheel-inner")) return;
    if (!mouseDown) return;

    updateRotation(e.clientX, e.clientY);
  };

  function updateRotation(currentX, currentY) {
    const $innerButton = document.querySelector(".js-wheel-inner");
    const [centerX, centerY] = getCenterCoords($innerButton);
    const [lastX, lastY] = lastCoords;

    if (lastX === 0 || lastY === 0) {
      setLastCoords([currentY, currentY]);
      return;
    }

    const change = toDegrees(
      getAngleBetween(centerX, centerY, lastX, lastY, currentX, currentY)
    );

    if (change !== 0) {
      setAngleChange(change);
      setTotalRotation(totalRotation + change);
    }

    setLastCoords([currentX, currentY]);
  }

  // The function will return a negative change in angle if counter clockwise and positive if clockwise.
  // cx,cy center of rotation
  // ox,oy old position of mouse
  // mx,my new position of mouse.
  function getAngleBetween(cx, cy, ox, oy, mx, my) {
    var x1 = ox - cx;
    var y1 = oy - cy;
    var x2 = mx - cx;
    var y2 = my - cy;
    var d1 = Math.max(0.001, Math.sqrt(x1 * x1 + y1 * y1));
    var d2 = Math.max(0.001, Math.sqrt(x2 * x2 + y2 * y2));

    return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
  }

  function toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

  function getCenterCoords(targetNode) {
    const centerX = targetNode.offsetLeft + targetNode.offsetWidth / 2;
    const centerY = targetNode.offsetTop + targetNode.offsetHeight / 2;
    return [centerX, centerY];
  }

  return (
    <div
      className="wheel"
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={throttle(handleMouseMove, 100)}
    >
      <div className="js-wheel-inner wheel-inner" onClick={handleClick}></div>
    </div>
  );
}

export function TouchWheelProvider(props) {
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

export function useTouchWheelTick(onTick) {
  // this needs to call onTick at the appropriate time
  const context = useContext(TouchWheelContext);
  const { angleChange, totalRotation, nextTick, setNextTick } = context;

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

export function useTouchWheelClick(onClick) {
  const context = useContext(TouchWheelContext);
  const { setHandleClick } = context;

  useEffect(() => {
    setHandleClick(() => onClick);
  }, [onClick, setHandleClick]);
}
