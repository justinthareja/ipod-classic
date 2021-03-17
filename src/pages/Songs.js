import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/tracks.json";

function Songs(props) {
  return (
    <Screen>
      <ScreenHeader header="Songs" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
        }))}
      />
    </Screen>
  );
}

export default Songs;
