import { useAlbumById } from "../hooks/useAlbumById";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useAlbumDetailsStore } from "../store/albumDetailsStore";
import { useCallback, useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";

function AlbumDetails(props) {
  const { isLoading, isError, data: album, error } = useAlbumById(props.id);
  const { data: player } = usePlayer();

  const {
    activeIndex,
    goUp,
    goDown,
    albumId,
    setAlbumId,
    resetActiveIndex,
    setActiveIndex,
  } = useAlbumDetailsStore();

  // this is used to reset the index to 0 when selecting a
  // different album from the top
  useEffect(() => {
    if (props.id !== albumId) {
      setAlbumId(props.id);
      resetActiveIndex();
    }
  }, [props.id, albumId, setAlbumId, resetActiveIndex]);

  // this is used to update the index if the song plays through on the
  // now playing screen
  useEffect(() => {
    if (player && player.body && player.body.item && player.body.item.id) {
      if (album && album.body && album.body.tracks && album.body.tracks.items) {
        const currentlyPlayingTrackIndex = album.body.tracks.items.findIndex(
          ({ id }) => id === player.body.item.id
        );

        if (currentlyPlayingTrackIndex !== -1) {
          setActiveIndex(currentlyPlayingTrackIndex);
        }
      }
    }
  }, [player, album, setActiveIndex]);

  const onTick = useCallback(
    ({ direction }) => {
      if (direction === "clockwise") {
        if (activeIndex < album.body.tracks.items.length - 1) {
          goUp();
        }
      } else if (direction === "anticlockwise") {
        if (activeIndex > 0) {
          goDown();
        }
      }
    },
    [activeIndex, goUp, goDown, album]
  );

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
      contextURI={`spotify:album:${props.id}`}
      header={album.body.name}
      menuItems={album.body.tracks.items.map((item) => ({
        name: item.name,
        path: `/songs/${item.id}`,
        id: item.id,
      }))}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default AlbumDetails;
