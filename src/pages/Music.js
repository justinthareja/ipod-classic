import ScreenMenu from "../components/ScreenMenu";

function Music(props) {
  return (
    <ScreenMenu
      header="Music"
      menuItems={[
        { name: "Playlists", path: "/playlists", showArrow: true },
        { name: "Artists", path: "/artists", showArrow: true },
        { name: "Albums", path: "/albums", showArrow: true },
        // { name: "Shows", path: "/shows", showArrow: true },
        { name: "Songs", path: "/songs", showArrow: true },
        { name: "Now Playing", path: "now-playing", showArrow: true },
      ]}
    />
  );
}

export default Music;
