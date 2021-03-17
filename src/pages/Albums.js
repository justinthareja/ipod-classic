import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/albums.json";

function Albums(props) {
  return (
    <Screen>
      <ScreenHeader header="Albums" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.album.name,
          path: `/albums/${item.album.id}`,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

export default Albums;
