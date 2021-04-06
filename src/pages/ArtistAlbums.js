import { useCallback, useLayoutEffect, useEffect } from "react";
import { navigate } from "@reach/router";
import { usePlay, useAlbumsByArtist } from "../hooks";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useArtistAlbumsStore } from "../store/artistAlbumsStore";

function ArtistAlbums(props) {
  const { isLoading, isError, data: albums, error } = useAlbumsByArtist(
    props.id
  );
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

  const {
    activeIndex,
    goUp,
    goDown,
    artistId,
    setArtistId,
    resetActiveIndex,
  } = useArtistAlbumsStore();

  // this is used to reset the index to 0 when selecting a
  // different artist from the top
  useEffect(() => {
    if (props.id !== artistId) {
      setArtistId(props.id);
      resetActiveIndex();
    }
  }, [props.id, artistId, setArtistId, resetActiveIndex]);

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
      header={albums.body.items[0].artists[0].name}
      menuItems={albums.body.items.map((item) => ({
        name: item.name,
        path: `/albums/${item.id}`,
        id: item.id,
        showArrow: true,
      }))}
      onPlayPause={onPlayPause}
      onTick={onTick}
      parentIndex={activeIndex}
    />
  );
}

export default ArtistAlbums;
