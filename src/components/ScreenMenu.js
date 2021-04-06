import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import { navigate } from "@reach/router";
import {
  useRedirectToNowPlayingOnInactive,
  useTouchWheelTick,
  useTouchWheelClick,
  usePlayPauseClick,
} from "../hooks";
import Play from "../components/Play";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";

function ScreenMenu({
  menuItems,
  header,
  contextURI,
  URIs,
  onPlayPause,
  parentIndex,
  onTick,
}) {
  const NUM_ITEMS = 6;
  const ITEM_HEIGHT = 19; // px
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(parentIndex || 0);
  const [visibleRange, setVisibleRange] = useState([0, NUM_ITEMS - 1]);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (typeof parentIndex === "number" && parentIndex !== activeIndex) {
      setActiveIndex(parentIndex);
    }
  }, [parentIndex, activeIndex]);

  useTouchWheelTick(
    typeof onTick === "function"
      ? onTick
      : ({ direction }) => {
          if (direction === "clockwise") {
            if (activeIndex < menuItems.length - 1) {
              setActiveIndex(activeIndex + 1);
            }
          } else if (direction === "anticlockwise") {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
          }
        }
  );

  const handleTouchWheelClick = useCallback(() => {
    const activeItem = menuItems[activeIndex];
    // if the item doesn't have an arrow, it means this partiuclar screen navigates to the
    // now playing screen when clicked
    // let spotify know to play the song before navigating
    if (!activeItem.showArrow) {
      setShouldPlay(true);
    } else {
      // if the item does have an arrow, it means the next component is just anoher
      // list component so navigate straight to it
      navigate(activeItem.path);
    }
  }, [activeIndex, menuItems]);

  useTouchWheelClick(handleTouchWheelClick);

  const handlePlayPauseClick = useCallback(() => {
    const activeItem = menuItems[activeIndex];
    onPlayPause && onPlayPause(activeItem);
  }, [onPlayPause, menuItems, activeIndex]);

  usePlayPauseClick(handlePlayPauseClick);

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

  const onPlaySuccess = useCallback(() => {
    const activeItem = menuItems[activeIndex];
    navigate(activeItem.path);
  }, [menuItems, activeIndex]);

  // only playOptions should be
  const playOptions = useMemo(
    () => ({
      context_uri: contextURI,
      uris: URIs,
      offset: {
        position: activeIndex,
      },
      position_ms: 0,
    }),
    [activeIndex, contextURI, URIs]
  );

  useRedirectToNowPlayingOnInactive();

  if (shouldPlay) {
    return <Play playOptions={playOptions} onPlaySuccess={onPlaySuccess} />;
  }

  return (
    <Screen>
      <ScreenHeader header={header} />
      <div className="screen-menu-container" ref={contentRef}>
        <ul className="screen-menu">
          {menuItems.map(({ name, showArrow }, i) => (
            <li
              key={`${name}-${i}`}
              className={`menu-item ${i === activeIndex ? "is-active" : ""}`}
            >
              <span className="truncate">{name}</span>
              {showArrow && (
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

export default ScreenMenu;
