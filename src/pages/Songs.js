import { useTracks } from "../hooks/useTracks";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Songs(props) {
  const { isLoading, isError, data, error } = useTracks();

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
      header="Songs"
      menuItems={data.body.items.map((item) => ({
        name: item.track.name,
        path: `/songs/${item.track.id}`,
        id: item.track.id,
      }))}
    />
  );
}

export default Songs;
