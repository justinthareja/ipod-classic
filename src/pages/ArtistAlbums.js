import { useUser } from "../context/UserContext";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import ScreenMenu from "../components/ScreenMenu";
import ErrorScreen from "../components/ErrorScreen";
import LoadComponent from "../components/LoadComponent";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/artist-albums.json";

function ArtistAlbums({ result }) {
  console.log(result);
  return (
    <Screen>
      <ScreenHeader header={result.items[0].artists[0].name} />
      <ScreenMenu
        menuItems={result.items.map((item) => ({
          name: item.name,
          path: `/albums/${item.id}`,
        }))}
      />
    </Screen>
  );
}

function LoadArtistAlbums({ id: artistId }) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <ArtistAlbums result={body} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: ["artists", artistId, "albums"],
        queryFn: () => spotifyApi.getArtistAlbums(artistId),
      }}
    />
  ) : (
    <ArtistAlbums result={stub} />
  );
}

export default LoadArtistAlbums;
