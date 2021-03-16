import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import EVT from "../lib/EVT";
import tickSrc from "../assets/tick.m4a";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";

function MenuScreen(props) {
  const NUM_ITEMS = 6;
  const ITEM_HEIGHT = 19; // px
  const { header, statusIcon, menuItems } = props;
  const contentRef = useRef(null);
  const tickAudio = useRef(new Audio(tickSrc));
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState([0, NUM_ITEMS - 1]);

  useEffect(() => {
    EVT.on("wheel:tick", handleTick);

    function handleTick({ direction }) {
      if (direction === "clockwise") {
        if (selectedIndex < menuItems.length - 1) {
          setSeletedIndex(selectedIndex + 1);
          tickAudio.current.play();
        }
      } else if (direction === "anticlockwise") {
        if (selectedIndex > 0) {
          setSeletedIndex(selectedIndex - 1);
          tickAudio.current.play();
        }
      }
    }

    return function cleanup() {
      EVT.removeListener("wheel:tick");
    };
  }, [selectedIndex, menuItems]);

  useEffect(() => {
    EVT.on("wheel:click", handleClick);

    function handleClick() {
      const path = menuItems[selectedIndex].path;
      navigate(path);
    }

    return function cleanup() {
      EVT.removeListener("wheel:click");
    };
  });

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

    if (selectedIndex > bottom) {
      setVisibleRange(visibleRange.map((n) => n + 1));
      $content.scrollTop = $content.scrollTop + ITEM_HEIGHT;
    } else if (selectedIndex < top) {
      setVisibleRange(visibleRange.map((n) => n - 1));
      $content.scrollTop = $content.scrollTop - ITEM_HEIGHT;
    }
  }, [selectedIndex, visibleRange]);

  return (
    <Screen>
      <ScreenHeader header={header} statusIcon={statusIcon} />
      <div className="screen-content" ref={contentRef}>
        <ul className="screen-menu">
          {menuItems.map(({ name, path }, i) => (
            <li
              key={`${name}-${i}`}
              className={`menu-item ${i === selectedIndex ? "is-active" : ""}`}
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
    </Screen>
  );
}

export default MenuScreen;
