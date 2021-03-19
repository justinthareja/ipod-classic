import { throttle } from "lodash";
import { useState } from "react";
import { useTouchWheel, TICK_STEP } from "../context/TouchWheelContext";

function TouchWheel() {
  const {
    setAngleChange,
    setNextTick,
    totalRotation,
    setTotalRotation,
    handleClick,
  } = useTouchWheel();

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
      <button
        className="js-wheel-inner wheel-inner"
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default TouchWheel;
