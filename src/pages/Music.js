import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";

function Music(props) {
  return (
    <Screen>
      <ScreenHeader header="Music" />
      <ScreenMenu
        menuItems={[
          { name: "Playlists", path: "/playlists", showArrow: true },
          { name: "Albums", path: "/albums", showArrow: true },
          { name: "Songs", path: "/songs", showArrow: true },
          { name: "Shows", path: "/shows", showArrow: true },
          { name: "Episodes", path: "/episodes", showArrow: true },
        ]}
      />
    </Screen>
  );
}

export default Music;
