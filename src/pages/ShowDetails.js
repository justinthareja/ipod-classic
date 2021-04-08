import { useShowById } from "../hooks/useShowById";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function ShowDetails(props) {
  const { isLoading, isError, data, error } = useShowById(props.id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen error={error} />;
  }
  return (
    <ScreenMenu
      header={data.body.name}
      menuItems={data.body.episodes.items.map((item) => ({
        name: item.name,
        path: `/episodes/${item.id}`,
        id: item.id,
      }))}
    />
  );
}

export default ShowDetails;
