import ScreenMenu from "./ScreenMenu";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import result from "./stubs/playlists.json";

function Playlists(props) {
  return (
    <Screen>
      <ScreenHeader header="Playlists" />
      <ScreenMenu
        menuItems={result.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
