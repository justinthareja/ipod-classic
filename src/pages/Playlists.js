import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { usePlaylists } from "../hooks/usePlaylists";
import { usePlay } from "../hooks/usePlay";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function Playlists(props) {
  const { isLoading, isError, data, error } = usePlaylists();
  const { mutate: play, isSuccess, isLoading: isLoadingPlay } = usePlay({
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
      header="Playlists"
      menuItems={data.body.items.map((playlist) => ({
        name: playlist.name,
        path: `/playlists/${playlist.id}`,
        showArrow: true,
        id: playlist.id,
      }))}
      onPlayPause={onPlayPause}
    />
  );
}

export default Playlists;
