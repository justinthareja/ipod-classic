import { useTracks } from "../hooks/useTracks";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useTracksStore } from "../store";
import { useCallback, useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";

function Songs(props) {
  const { isLoading, isError, data: tracks, error } = useTracks();
  const { data: player } = usePlayer();

  const { activeIndex, goUp, goDown, setActiveIndex } = useTracksStore(
    (state) => state
  );

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < tracks.body.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, tracks]
  );

  // this is used to update the index if the song plays through on the
  // now playing screen
  useEffect(() => {
    if (player && player.body && player.body.item && player.body.item.id) {
      if (tracks && tracks.body && tracks.body.items) {
        const currentlyPlayingTrackIndex = tracks.body.items.findIndex(
          ({ track }) => track.id === player.body.item.id
        );

        if (currentlyPlayingTrackIndex !== -1) {
          setActiveIndex(currentlyPlayingTrackIndex);
        }
      }
    }
  }, [player, tracks, setActiveIndex]);

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

  const menuItems = tracks.body.items.map((item) => ({
    name: item.track.name,
    path: `/songs/${item.track.id}`,
    id: item.track.id,
  }));

  const URIs = menuItems.map(({ id }) => `spotify:track:${id}`);

  return (
    <ScreenMenu
      header="Songs"
      menuItems={menuItems}
      URIs={URIs}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default Songs;
