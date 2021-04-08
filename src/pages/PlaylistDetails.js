import { useCallback, useEffect } from "react";
import { usePlaylistById } from "../hooks/usePlaylistById";
import { usePlaylistDetailsStore } from "../store";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { usePlayer } from "../hooks/usePlayer";

function PlaylistDetails(props) {
  const { data: player } = usePlayer();
  const { isLoading, isError, data: playlist, error } = usePlaylistById(
    props.id
  );

  const {
    activeIndex,
    goUp,
    goDown,
    playlistId,
    setPlaylistId,
    resetActiveIndex,
    setActiveIndex,
  } = usePlaylistDetailsStore();

  // this is used to reset the index to 0 when selecting a
  // different playlist from the top
  useEffect(() => {
    if (props.id !== playlistId) {
      setPlaylistId(props.id);
      resetActiveIndex();
    }
  }, [props.id, playlistId, setPlaylistId, resetActiveIndex]);

  // this is used to update the index if the song plays through on the
  // now playing screen
  useEffect(() => {
    if (player && player.body && player.body.item && player.body.item.id) {
      if (
        playlist &&
        playlist.body &&
        playlist.body.tracks &&
        playlist.body.tracks.items
      ) {
        const currentlyPlayingTrackIndex = playlist.body.tracks.items.findIndex(
          ({ track }) => track.id === player.body.item.id
        );

        if (currentlyPlayingTrackIndex !== -1) {
          setActiveIndex(currentlyPlayingTrackIndex);
        }
      }
    }
  }, [player, playlist, setActiveIndex]);

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < playlist.body.tracks.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, playlist]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen error={error} />;
  }

  return (
    <ScreenMenu
      contextURI={`spotify:playlist:${props.id}`}
      header={playlist.body.name}
      menuItems={playlist.body.tracks.items.map((item) => ({
        name: item.track.name,
        path: `/songs/${item.track.id}`,
        id: item.track.id,
      }))}
      parentIndex={activeIndex}
      onTick={onTick}
    />
  );
}

export default PlaylistDetails;
