import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "@reach/router";
import { useTouchWheelTick, useTouchWheelClick } from "./TouchWheel";
import { useMenu } from "./Controls";

function ScreenMenu({ menuItems }) {
  const NUM_ITEMS = 6;
  const ITEM_HEIGHT = 19; // px
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState([0, NUM_ITEMS - 1]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < menuItems.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    },
    [menuItems.length, activeIndex]
  );

  const handleClick = useCallback(() => {
    const path = menuItems[activeIndex].path;
    navigate(path);
  }, [menuItems, activeIndex, navigate]);

  const handleMenuClick = useCallback(() => {
    if (location.pathname === "/") {
      return;
    }

    navigate(-1);
  }, [navigate, location]);

  useTouchWheelTick(handleTick);
  useTouchWheelClick(handleClick);
  useMenu(handleMenuClick);

  useEffect(() => {
    const $content = contentRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };

    $content.addEventListener("wheel", handleWheel);

    return function () {
      $content.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useLayoutEffect(() => {
    const $content = contentRef.current;
    const [top, bottom] = visibleRange;

    if (activeIndex > bottom) {
      setVisibleRange(visibleRange.map((n) => n + 1));
      $content.scrollTop = $content.scrollTop + ITEM_HEIGHT;
    } else if (activeIndex < top) {
      setVisibleRange(visibleRange.map((n) => n - 1));
      $content.scrollTop = $content.scrollTop - ITEM_HEIGHT;
    }
  }, [activeIndex, visibleRange]);

  return (
    <div className="screen-menu-container" ref={contentRef}>
      <ul className="screen-menu">
        {menuItems.map(({ name, path }, i) => (
          <li
            key={`${name}-${i}`}
            className={`menu-item ${i === activeIndex ? "is-active" : ""}`}
          >
            <span className="truncate">{name}</span>
            {path && (
              <svg
                className="icon cheveron-right"
                viewBox="0 0 5.8859 9.8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="primary"
                  d="m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScreenMenu;
