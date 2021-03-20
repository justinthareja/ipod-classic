import { usePlaylistById } from "../hooks/usePlaylistById";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function PlaylistDetails(props) {
  const { isLoading, isError, data, error } = usePlaylistById(props.id);

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
      <ScreenHeader header={data.body.name} />
      <ScreenMenu
        menuItems={data.body.tracks.items.map((item) => ({
          name: item.track.name,
          path: `/songs/${item.track.id}`,
          id: item.track.id,
        }))}
      />
    </Screen>
  );
}

export default PlaylistDetails;
