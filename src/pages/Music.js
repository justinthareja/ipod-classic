import { useState, useEffect, useMemo } from "react";
import { usePlayer } from "../hooks";
import { useTouchWheelTick } from "../hooks/useTouchWheelTick";
import { useMusicStore } from "../store";
import ScreenMenu from "../components/ScreenMenu";

function Music(props) {
  const initialMenuItems = useMemo(
    () => [
      { name: "Playlists", path: "/playlists", showArrow: true },
      { name: "Artists", path: "/artists", showArrow: true },
      { name: "Albums", path: "/albums", showArrow: true },
      { name: "Songs", path: "/songs", showArrow: true },
      { name: "Now Playing", path: "now-playing", showArrow: true },
    ],
    []
  );

  const { data: player } = usePlayer();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const { activeIndex, goUp, goDown } = useMusicStore((state) => state);

  useTouchWheelTick(({ direction }) => {
    if (direction === "clockwise") {
      if (activeIndex < menuItems.length - 1) {
        goUp();
      }
    } else if (direction === "anticlockwise") {
      if (activeIndex > 0) {
        goDown();
      }
    }
  });

  useEffect(() => {
    if (!player || !player.body) {
      setMenuItems((menuItems) =>
        initialMenuItems.filter(({ name }) => name !== "Now Playing")
      );
    } else {
      setMenuItems(initialMenuItems);
    }
  }, [player, initialMenuItems]);

  return (
    <ScreenMenu
      header="Music"
      menuItems={menuItems}
      parentIndex={activeIndex}
    />
  );
}

export default Music;
