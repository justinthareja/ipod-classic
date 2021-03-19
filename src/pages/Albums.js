import { useUser } from "../context/UserContext";
import LoadComponent from "../LoadComponent";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/albums.json";

function Albums({ result }) {
  return (
    <Screen>
      <ScreenHeader header="Albums" />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.album.name,
          path: `/albums/${item.album.id}`,
          showArrow: true,
        }))}
      />
    </Screen>
  );
}

function LoadAlbums(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      Component={Albums}
      query={{
        queryKey: "albums",
        queryFn: () => spotifyApi.getMySavedAlbums(),
      }}
    />
  ) : (
    <Albums result={stub} />
  );
}

export default LoadAlbums;
