import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import LoadComponent from "../LoadComponent";
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
      Component={Playlists}
      query={{
        queryKey: "playlists",
        queryFn: () => spotifyApi.getUserPlaylists("adsifjasdflsdfjsdkhfk"),
      }}
    />
  ) : (
    <Playlists result={stub} />
  );
}

export default LoadPlaylists;
