import { useUser } from "../context/UserContext";
import LoadComponent from "../components/LoadComponent";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
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
          id: playlist.id,
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
