import { useCallback, useLayoutEffect } from "react";
import { navigate } from "@reach/router";
import { useArtists } from "../hooks/useArtists";
import { usePlay } from "../hooks/usePlay";
import ScreenMenu from "../components/ScreenMenu";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
function Artists(props) {
  const { isLoading, isError, data, error } = useArtists();
  const { mutate: play, isSuccess, isLoading: isLoadingPlay } = usePlay({
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
      header="Artists"
      menuItems={data.body.items.map((item) => ({
        name: item.name,
        path: `/artists/${item.id}/albums`,
        id: item.id,
        showArrow: true,
      }))}
      onPlayPause={onPlayPause}
    />
  );
}

export default Artists;
