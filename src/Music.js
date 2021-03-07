import MenuScreen from "./MenuScreen";

function Music(props) {
  return (
    <MenuScreen
      header="Music"
      menuItems={[
        { name: "Playlists", hasSubMenu: true },
        { name: "Artists", hasSubMenu: true },
        { name: "Albums", hasSubMenu: true },
        { name: "Shows", hasSubMenu: true },
        { name: "Songs", hasSubMenu: true },
      ]}
    />
  );
}

export default Music;
