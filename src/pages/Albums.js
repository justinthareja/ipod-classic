import { useAlbums } from "../hooks/useAlbums";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
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
    <Screen>
      <ScreenHeader header="Albums" />
      <ScreenMenu
        menuItems={data.body.items.map((item) => ({
          name: item.album.name,
          path: `/albums/${item.album.id}`,
          showArrow: true,
          id: item.album.id,
        }))}
      />
    </Screen>
  );
}

export default Albums;
