import ScreenMenu from "./ScreenMenu";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import result from "./stubs/episodes.json";

function Shows(props) {
  console.log(result);
  return (
    <Screen>
      <ScreenHeader header="Episodes" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.episode.name,
          path: `/episodes/${item.episode.id}`,
        }))}
      />
    </Screen>
  );
}

export default Shows;
