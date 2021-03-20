import { useArtists } from "../hooks/useArtists";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
function Artists(props) {
  const { isLoading, isError, data, error } = useArtists();

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
      <ScreenHeader header="Artists" />
      <ScreenMenu
        menuItems={data.body.items.map((item) => ({
          name: item.name,
          path: `/artists/${item.id}/albums`,
          id: item.id,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

export default Artists;
