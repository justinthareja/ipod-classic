import { useUser } from "../context/UserContext";
import LoadComponent from "../LoadComponent";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import ErrorScreen from "../ErrorScreen";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/playlists.json";

function Playlists({ result }) {
  return (
    <Screen>
      <ScreenHeader header="Playlists" />
      <ScreenMenu
        menuItems={result.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

function LoadPlaylists(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <Playlists result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: "playlists",
        queryFn: () => spotifyApi.getUserPlaylists(),
      }}
    />
  ) : (
    <Playlists result={stub} />
  );
}

export default LoadPlaylists;
