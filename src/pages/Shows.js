import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/shows.json";

function Shows(props) {
  return (
    <Screen>
      <ScreenHeader header="Shows" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.show.name,
          path: `/shows/${item.show.id}`,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

export default Shows;
