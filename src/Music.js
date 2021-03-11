import MenuScreen from "./MenuScreen";

function Music(props) {
  return (
    <MenuScreen
      header="Music"
      menuItems={[
        { name: "Playlists" },
        { name: "Artists" },
        { name: "Albums" },
        { name: "Shows" },
        { name: "Songs" },
        { name: "Genres" },
        { name: "Composers" },
      ]}
    />
  );
}

export default Music;
