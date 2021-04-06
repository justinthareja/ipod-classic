import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { useArtists } from "../hooks/useArtists";
import { usePlay } from "../hooks/usePlay";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useArtistsStore } from "../store";

function Artists(props) {
  const { isLoading, isError, data: artists, error } = useArtists();
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
        context_uri: `spotify:artist:${activeItem.id}`,
      });
    },
    [play]
  );

  useLayoutEffect(() => {
    if (isSuccess) {
      navigate("/now-playing");
    }
  }, [isSuccess]);

  const { activeIndex, goUp, goDown } = useArtistsStore();

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < artists.body.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, artists]
  );

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
      header="Artists"
      menuItems={artists.body.items.map((item) => ({
        name: item.name,
        path: `/artists/${item.id}/albums`,
        id: item.id,
        showArrow: true,
      }))}
      onPlayPause={onPlayPause}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default Artists;
