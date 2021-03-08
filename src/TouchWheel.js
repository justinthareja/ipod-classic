import { throttle } from "lodash";

// degrees needed to scroll before a tick
const TICK_STEP = 50;

let nextTick = TICK_STEP;
let mouseDown = false;
let lastCoords = [0, 0];
let angleChange = 0;
let totalRotation = 0;

function TouchWheel(props) {
  const { onClick, onTick } = props;
  const handleMouseDown = (e) => {
    mouseDown = true;
  };

  const handleMouseUp = (e) => {
    mouseDown = false;
    totalRotation = 0;
    lastCoords = [0, 0];
    nextTick = TICK_STEP;
    angleChange = 0;
  };

  const handleMouseOut = (e) => {
    mouseDown = false;
    totalRotation = 0;
    lastCoords = [0, 0];
    nextTick = TICK_STEP;
    angleChange = 0;
  };

  const handleMouseMove = (e) => {
    if (e.target.matches(".js-wheel-inner")) return;
    if (!mouseDown) return;

    updateRotation(e.clientX, e.clientY);
    checkTick();
  };

  function checkTick() {
    if (angleChange < 0 && totalRotation <= nextTick) {
      onTick({ direction: "anticlockwise" });
      nextTick = totalRotation - TICK_STEP;
    } else if (angleChange > 0 && totalRotation >= nextTick) {
      onTick({ direction: "clockwise" });
      nextTick = totalRotation + TICK_STEP;
    }
  }

  function updateRotation(currentX, currentY) {
    const $innerButton = document.querySelector(".js-wheel-inner");
    const [centerX, centerY] = getCenterCoords($innerButton);
    const [lastX, lastY] = lastCoords;

    if (lastX === 0 || lastY === 0) {
      lastCoords = [currentY, currentY];
      return;
    }

    const change = toDegrees(
      getAngleBetween(centerX, centerY, lastX, lastY, currentX, currentY)
    );

    if (change !== 0) {
      angleChange = change;
      totalRotation = totalRotation + change;
    }

    lastCoords = [currentX, currentY];
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
      <div className="js-wheel-inner wheel-inner" onClick={onClick}></div>
    </div>
  );
}

export default TouchWheel;
