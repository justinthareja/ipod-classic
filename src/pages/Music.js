import { useState, useEffect, useMemo } from "react";
import { usePlayer } from "../hooks";
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

  useEffect(() => {
    if (!player || !player.body) {
      setMenuItems((menuItems) =>
        initialMenuItems.filter(({ name }) => name !== "Now Playing")
      );
    } else {
      setMenuItems(initialMenuItems);
    }
  }, [player, initialMenuItems]);

  return <ScreenMenu header="Music" menuItems={menuItems} />;
}

export default Music;
