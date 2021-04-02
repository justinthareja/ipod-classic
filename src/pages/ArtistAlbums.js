import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { usePlay, useAlbumsByArtist } from "../hooks";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function ArtistAlbums(props) {
  const { isLoading, isError, data, error } = useAlbumsByArtist(props.id);
  const { mutate: play, isSuccess, isLoading: isLoadingPlay } = usePlay({
    isNewTrack: true,
  });

  const onPlayPause = useCallback(
    (activeItem) => {
      play({
        context_uri: `spotify:album:${activeItem.id}`,
      });
    },
    [play]
  );

  useLayoutEffect(() => {
    if (isSuccess) {
      navigate("/now-playing");
    }
  }, [isSuccess]);

  if (isLoading || isLoadingPlay) {
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
      onPlayPause={onPlayPause}
    />
  );
}

export default ArtistAlbums;
