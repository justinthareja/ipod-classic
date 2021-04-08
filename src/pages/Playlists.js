import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { usePlaylists } from "../hooks/usePlaylists";
import { usePlay } from "../hooks/usePlay";
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

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < playlists.body.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, playlists]
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
      header="Playlists"
      menuItems={playlists.body.items.map((playlist) => ({
        name: playlist.name,
        path: `/playlists/${playlist.id}`,
        showArrow: true,
        id: playlist.id,
      }))}
      onPlayPause={onPlayPause}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default Playlists;
