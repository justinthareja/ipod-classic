import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import result from "../stubs/playlists.json";

function Playlists(props) {
  const query = useQuery("playlists", () => spotifyApi.getUserPlaylists());
  const playlists = query.data ? query.data.body : result;

  return (
    <Screen>
      <ScreenHeader header="Playlists" />
      <ScreenMenu
        menuItems={playlists.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
