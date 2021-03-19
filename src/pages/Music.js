import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";

function Music(props) {
  return (
    <Screen>
      <ScreenHeader header="Music" />
      <ScreenMenu
        menuItems={[
          { name: "Playlists", path: "/playlists", showArrow: true },
          { name: "Artists", path: "/artists", showArrow: true },
          { name: "Albums", path: "/albums", showArrow: true },
          { name: "Shows", path: "/shows", showArrow: true },
          { name: "Songs", path: "/songs", showArrow: true },
        ]}
      />
    </Screen>
  );
}

export default Music;
