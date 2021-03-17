import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";

function Music(props) {
  return (
    <Screen>
      <ScreenHeader header="Music" />
      <ScreenMenu
        menuItems={[
          { name: "Playlists", path: "/playlists" },
          { name: "Albums", path: "/albums" },
          { name: "Songs", path: "/songs" },
          { name: "Shows", path: "/shows" },
          { name: "Episodes", path: "/episodes" },
        ]}
      />
    </Screen>
  );
}

export default Music;
