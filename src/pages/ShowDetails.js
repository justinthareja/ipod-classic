import { useShowById } from "../hooks/useShowById";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function ShowDetails(props) {
  const { isLoading, isError, data, error } = useShowById(props.id);

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
        menuItems={data.body.episodes.items.map((item) => ({
          name: item.name,
          path: `/episodes/${item.id}`,
          id: item.id,
        }))}
      />
    </Screen>
  );
}

export default ShowDetails;
