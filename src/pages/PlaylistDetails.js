import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/playlist.json";

function Playlists(props) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.tracks.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
