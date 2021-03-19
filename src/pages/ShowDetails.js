import { useUser } from "../context/UserContext";
import LoadComponent from "../components/LoadComponent";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/show.json";

function ShowDetails({ result }) {
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

function LoadShowDetails({ id }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <ShowDetails result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: ["shows", id],
        queryFn: () => spotifyApi.getShow(id),
      }}
    />
  ) : (
    <ShowDetails result={stub} />
  );
}

export default LoadShowDetails;
