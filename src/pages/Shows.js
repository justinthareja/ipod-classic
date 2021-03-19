import { useUser } from "../context/UserContext";
import LoadComponent from "../components/LoadComponent";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
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
      renderSuccess={({ body }) => <Shows result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
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
