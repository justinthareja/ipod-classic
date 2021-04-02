import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { usePlaylists } from "../hooks/usePlaylists";
import { usePlay } from "../hooks/usePlay";
import { useTouchWheelTick } from "../hooks";
import { usePlaylistsStore } from "../store";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Playlists(props) {
  const { isLoading, isError, data: playlists, error } = usePlaylists();
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
        context_uri: `spotify:playlist:${activeItem.id}`,
      });
    },
    [play]
  );

  useLayoutEffect(() => {
    if (isSuccess) {
      navigate("/now-playing");
    }
  }, [isSuccess]);

  const { activeIndex, goUp, goDown } = usePlaylistsStore((state) => state);

  useTouchWheelTick(({ direction }) => {
    if (direction === "clockwise") {
      if (activeIndex < playlists.length - 1) {
        goUp();
      }
    } else if (direction === "anticlockwise") {
      if (activeIndex > 0) {
        goDown();
      }
    }
  });

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
      header="Playlists"
      menuItems={playlists}
      onPlayPause={onPlayPause}
      parentIndex={activeIndex}
    />
  );
}

export default Playlists;
