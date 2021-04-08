import { useShows } from "../hooks/useShows";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Shows(props) {
  const { isLoading, isError, data, error } = useShows();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <ScreenMenu
      header="Shows"
      menuItems={data.body.items.map((item) => ({
        name: item.show.name,
        path: `/shows/${item.show.id}`,
        showArrow: true,
        id: item.show.id,
      }))}
    />
  );
}

export default Shows;
