import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/show.json";

function ShowDetails(props) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.episodes.items.map((item) => ({
          name: item.name,
          path: `/episodes/${item.id}`,
        }))}
      />
    </Screen>
  );
}

export default ShowDetails;
