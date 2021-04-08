import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { useAlbums } from "../hooks/useAlbums";
import { usePlay } from "../hooks/usePlay";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useArtistsStore } from "../store/artistsStore";

function Albums(props) {
  const { isLoading, isError, data: albums, error } = useAlbums();
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

  const { activeIndex, goUp, goDown } = useArtistsStore((state) => state);

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < albums.body.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, albums]
  );

  if (isLoading || isLoadingPlay) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen error={error} />;
  }

  if (playQuery.isError) {
    return <ErrorScreen error={playQuery.error} />;
  }

  return (
    <ScreenMenu
      header="Albums"
      menuItems={albums.body.items.map((item) => ({
        name: item.album.name,
        path: `/albums/${item.album.id}`,
        showArrow: true,
        id: item.album.id,
      }))}
      onPlayPause={onPlayPause}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default Albums;
