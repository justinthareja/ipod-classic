import { useShows } from "../hooks/useShows";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Shows(props) {
  const { isLoading, isError, data, error } = useShows();

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
      <ScreenHeader header="Shows" />
      <ScreenMenu
        menuItems={data.body.items.map((item) => ({
          name: item.show.name,
          path: `/shows/${item.show.id}`,
          showArrow: true,
          id: item.show.id,
        }))}
      />
    </Screen>
  );
}

export default Shows;
