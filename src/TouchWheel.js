import { useState, useEffect } from "react";
import { throttle } from "lodash";

function TouchWheel(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [lastCoords, setLastCoords] = useState([0, 0]);
  const [angleChange, setAngleChange] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);

  const { onTick } = props;

  useEffect(() => {
    // degrees needed to scroll before a tick
    const TICK_STEP = 30;

    let direction;
    if (angleChange > 0) {
      direction = "clockwise";
    } else if (angleChange < 0) {
      direction = "anticlockwise";
    }

    if (!direction) return;

    let rotation = Math.round(Math.abs(totalRotation));
    if (rotation !== 0 && rotation % TICK_STEP === 0) {
      onTick({ direction });
    }
  }, [totalRotation, angleChange, onTick]);

  const handleMouseDown = (e) => {
    setMouseDown(true);
  };

  const handleMouseUp = (e) => {
    setMouseDown(false);
    setTotalRotation(0);
  };
  const handleMouseOut = (e) => {
    setMouseDown(false);
    setTotalRotation(0);
  };

  const handleMouseMove = (e) => {
    if (e.target.matches(".js-wheel-inner")) return;
    if (!mouseDown) return;

    updateRotation(e.clientX, e.clientY);
  };

  function toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

  function updateRotation(currentX, currentY) {
    const $innerButton = document.querySelector(".js-wheel-inner");
    const centerX = $innerButton.offsetLeft + $innerButton.offsetWidth / 2;
    const centerY = $innerButton.offsetTop + $innerButton.offsetHeight / 2;
    const [lastX, lastY] = lastCoords;

    const delta = getAngleBetween(
      centerX,
      centerY,
      lastX,
      lastY,
      currentX,
      currentY
    );

    setAngleChange(toDegrees(delta));
    setTotalRotation(totalRotation + toDegrees(delta));
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
    var d1 = Math.sqrt(x1 * x1 + y1 * y1);
    var d2 = Math.sqrt(x2 * x2 + y2 * y2);

    return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
  }

  return (
    <div
      className="wheel"
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={throttle(handleMouseMove, 100)}
    >
      <div className="js-wheel-inner wheel-inner"></div>
    </div>
  );
}

export default TouchWheel;
