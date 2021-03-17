import ScreenMenu from "./ScreenMenu";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import result from "./stubs/album.json";

function Albums(props) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.tracks.items.map((item) => ({
          name: item.name,
          path: `/tracks/${item.id}`,
        }))}
      />
    </Screen>
  );
}

export default Albums;
