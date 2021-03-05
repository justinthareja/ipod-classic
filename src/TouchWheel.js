import { useState, useEffect } from "react";
import { throttle } from "lodash";

function TouchWheel(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [lastCoords, setLastCoords] = useState([0, 0]);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    console.log(direction);
  }, [direction]);

  const handleMouseDown = (e) => {
    setMouseDown(true);
  };
  const handleMouseUp = (e) => {
    setMouseDown(false);
  };
  const handleMouseOut = (e) => {
    setMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (e.target.matches(".js-wheel-inner")) return;
    if (!mouseDown) return;

    checkDirection(e.clientX, e.clientY);
  };

  function checkDirection(currentX, currentY) {
    const $innerButton = document.querySelector(".js-wheel-inner");
    const centerX = $innerButton.offsetLeft + $innerButton.offsetWidth / 2;
    const centerY = $innerButton.offsetTop + $innerButton.offsetHeight / 2;
    const [lastX, lastY] = lastCoords;
    const cross = getAngle(centerX, centerY, lastX, lastY, currentX, currentY);

    if (cross > 0) {
      setDirection("clockwise");
    } else if (cross < 0) {
      setDirection("counterclockwise");
    }

    setLastCoords([currentX, currentY]);
  }

  // The function will return a negative change in angle if counter clockwise and positive if clockwise.
  // cx,cy center of rotation
  // ox,oy old position of mouse
  // mx,my new position of mouse.
  function getAngle(cx, cy, ox, oy, mx, my) {
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
