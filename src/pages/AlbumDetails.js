import { useUser } from "../context/UserContext";
import ScreenMenu from "../components/ScreenMenu";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
import LoadComponent from "../components/LoadComponent";
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
          id: item.id,
        }))}
      />
    </Screen>
  );
}

function LoadAlbumDetails({ id }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <AlbumDetails result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
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
