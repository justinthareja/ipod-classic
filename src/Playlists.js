import ScreenMenu from "./ScreenMenu";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import playlists from "./stubs/playlists.json";

function Playlists(props) {
  return (
    <Screen>
      <ScreenHeader header="Playlists" />
      <ScreenMenu
        menuItems={playlists.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
