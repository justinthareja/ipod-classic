import { useUser } from "../context/UserContext";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import LoadComponent from "../LoadComponent";
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
      Component={PlaylistDetails}
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
