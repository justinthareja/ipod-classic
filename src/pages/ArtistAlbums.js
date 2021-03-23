import { useAlbumsByArtist } from "../hooks/useAlbumsByArtist";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function ArtistAlbums(props) {
  const { isLoading, isError, data, error } = useAlbumsByArtist(props.id);

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
    <ScreenMenu
      header={data.body.items[0].artists[0].name}
      menuItems={data.body.items.map((item) => ({
        name: item.name,
        path: `/albums/${item.id}`,
        id: item.id,
        showArrow: true,
      }))}
    />
  );
}

export default ArtistAlbums;
