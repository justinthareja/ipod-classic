import { useUser } from "../context/UserContext";
import ScreenMenu from "../ScreenMenu";
import Screen from "../Screen";
import ScreenHeader from "../ScreenHeader";
import LoadComponent from "../LoadComponent";
import stub from "../stubs/album.json";
import spotifyApi from "../api/spotifyApi";

function AlbumDetails({ result }) {
  return (
    <Screen>
      <ScreenHeader header={result.name} />
      <ScreenMenu
        menuItems={result.tracks.items.map((item) => ({
          name: item.name,
          path: `/songs/${item.id}`,
        }))}
      />
    </Screen>
  );
}

function LoadAlbumDetails({ id }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      Component={AlbumDetails}
      query={{
        queryKey: ["albums", id],
        queryFn: () => spotifyApi.getAlbum(id),
      }}
    />
  ) : (
    <AlbumDetails result={stub} />
  );
}

export default LoadAlbumDetails;
