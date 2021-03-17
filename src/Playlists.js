import MenuScreen from "./MenuScreen";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import playlists from "./stubs/playlists.json";

function Playlists(props) {
  return (
    <Screen>
      <ScreenHeader header="Playlists" />
      <MenuScreen
        menuItems={playlists.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
