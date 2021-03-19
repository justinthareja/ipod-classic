import { useUser } from "../context/UserContext";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ScreenMenu from "../components/ScreenMenu";
import ErrorScreen from "../components/ErrorScreen";
import LoadComponent from "../components/LoadComponent";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/artists";

function Artists({ result }) {
  return (
    <Screen>
      <ScreenHeader header="Artists" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.name,
          path: `/artists/${item.id}/albums`,
          id: item.id,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

function LoadArtists(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <Artists result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: "artists",
        queryFn: () => spotifyApi.getMyTopArtists(),
      }}
    />
  ) : (
    <Artists result={stub} />
  );
}

export default LoadArtists;
