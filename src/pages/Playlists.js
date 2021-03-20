import { usePlaylists } from "../hooks/usePlaylists";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
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
    <Screen>
      <ScreenHeader header="Playlists" />
      <ScreenMenu
        menuItems={data.body.items.map((playlist) => ({
          name: playlist.name,
          path: `/playlists/${playlist.id}`,
          showArrow: true,
          id: playlist.id,
        }))}
      />
    </Screen>
  );
}

export default Playlists;
