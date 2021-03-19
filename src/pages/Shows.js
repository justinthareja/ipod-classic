import { useUser } from "../context/UserContext";
import LoadComponent from "../LoadComponent";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/shows.json";

function Shows({ result }) {
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

function LoadShows(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      Component={Shows}
      query={{
        queryKey: "shows",
        queryFn: () => spotifyApi.getMySavedShows(),
      }}
    />
  ) : (
    <Shows result={stub} />
  );
}

export default LoadShows;
