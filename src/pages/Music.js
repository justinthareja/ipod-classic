import MenuScreen from "../components/MenuScreen";

function Music(props) {
  return (
    <MenuScreen
      header="Music"
      menuItems={[
        { name: "Playlists", path: "/playlists" },
        { name: "Albums", path: "/albums" },
        { name: "Episodes", path: "/episodes" },
        { name: "Shows", path: "/shows" },
        { name: "Songs", path: "/songs" },
      ]}
    />
  );
}

export default Music;
