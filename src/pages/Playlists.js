import playlists from "../stubs/playlists.json";
import MenuScreen from "../components/MenuScreen";

function Playlists(props) {
  return (
    <MenuScreen
      header="Playlists"
      menuItems={playlists.items.map((playlist) => ({
        name: playlist.name,
        path: `/playlists/${playlist.id}`,
      }))}
    />
  );
}

export default Playlists;
