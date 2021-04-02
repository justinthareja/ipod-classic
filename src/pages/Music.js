import { useState, useEffect } from "react";
import { usePlayer } from "../hooks";
import ScreenMenu from "../components/ScreenMenu";

function Music(props) {
  const { data: player } = usePlayer();

  const [menuItems, setMenuItems] = useState([
    { name: "Playlists", path: "/playlists", showArrow: true },
    { name: "Artists", path: "/artists", showArrow: true },
    { name: "Albums", path: "/albums", showArrow: true },
    { name: "Songs", path: "/songs", showArrow: true },
    { name: "Now Playing", path: "now-playing", showArrow: true },
  ]);

  useEffect(() => {
    if (!player || !player.body) {
      setMenuItems((menuItems) =>
        menuItems.filter(({ name }) => name !== "Now Playing")
      );
    }
  }, [player]);

  return <ScreenMenu header="Music" menuItems={menuItems} />;
}

export default Music;
