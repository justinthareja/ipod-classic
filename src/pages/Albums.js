import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { useAlbums } from "../hooks/useAlbums";
import { usePlay } from "../hooks/usePlay";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Albums(props) {
  const { isLoading, isError, data, error } = useAlbums();
  const {
    mutate: play,
    isLoading: isLoadingPlay,
    isSuccess,
    ...playQuery
  } = usePlay({
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

  if (playQuery.isError) {
    return (
      <ErrorScreen
        status={playQuery.error.body.error.status}
        message={playQuery.error.body.error.message}
      />
    );
  }

  return (
    <ScreenMenu
      header="Albums"
      menuItems={data.body.items.map((item) => ({
        name: item.album.name,
        path: `/albums/${item.album.id}`,
        showArrow: true,
        id: item.album.id,
      }))}
      onPlayPause={onPlayPause}
    />
  );
}

export default Albums;
