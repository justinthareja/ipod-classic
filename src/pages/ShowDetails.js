import { useUser } from "../context/UserContext";
import LoadComponent from "../LoadComponent";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/show.json";

function ShowDetails({ result }) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.episodes.items.map((item) => ({
          name: item.name,
          path: `/episodes/${item.id}`,
        }))}
      />
    </Screen>
  );
}

function LoadShowDetails({ id }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      Component={ShowDetails}
      query={{
        queryKey: ["shows", id],
        queryFn: () => spotifyApi.getShow(id),
      }}
    />
  ) : (
    <ShowDetails result={stub} />
  );
}

export default LoadShowDetails;
