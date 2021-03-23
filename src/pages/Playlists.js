import { usePlaylists } from "../hooks/usePlaylists";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Playlists(props) {
  const { isLoading, isError, data, error } = usePlaylists();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        status={error.body.error.status}
        message={error.body.error.message}
      />
    );
  }

  return (
    <ScreenMenu
      header="Playlists"
      menuItems={data.body.items.map((playlist) => ({
        name: playlist.name,
        path: `/playlists/${playlist.id}`,
        showArrow: true,
        id: playlist.id,
      }))}
    />
  );
}

export default Playlists;
