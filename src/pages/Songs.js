import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
import LoadComponent from "../components/LoadComponent";
import stub from "../stubs/tracks.json";

function Songs({ result }) {
  return (
    <Screen>
      <ScreenHeader header="Songs" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
          id: item.track.id,
        }))}
      />
    </Screen>
  );
}

function LoadSongs(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <Songs result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: "songs",
        queryFn: () => spotifyApi.getMySavedTracks(),
      }}
    />
  ) : (
    <Songs result={stub} />
  );
}

export default LoadSongs;
