import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import LoadComponent from "../LoadComponent";
import stub from "../stubs/tracks.json";

function Songs({ result }) {
  return (
    <Screen>
      <ScreenHeader header="Songs" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
        }))}
      />
    </Screen>
  );
}

function LoadSongs(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      Component={Songs}
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
