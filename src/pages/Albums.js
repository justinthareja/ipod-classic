import { useAlbums } from "../hooks/useAlbums";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Albums(props) {
  const { isLoading, isError, data, error } = useAlbums();

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
      header="Albums"
      menuItems={data.body.items.map((item) => ({
        name: item.album.name,
        path: `/albums/${item.album.id}`,
        showArrow: true,
        id: item.album.id,
      }))}
    />
  );
}

export default Albums;
