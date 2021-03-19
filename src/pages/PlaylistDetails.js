import { useUser } from "../context/UserContext";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
import LoadComponent from "../components/LoadComponent";
import stub from "../stubs/playlist.json";
import spotifyApi from "../api/spotifyApi";

function PlaylistDetails({ result }) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.tracks.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
        }))}
      />
    </Screen>
  );
}

function LoadPlaylistDetails({ id }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <PlaylistDetails result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: ["playlist", id],
        queryFn: () => spotifyApi.getPlaylist(id),
      }}
    />
  ) : (
    <PlaylistDetails result={stub} />
  );
}

export default LoadPlaylistDetails;
