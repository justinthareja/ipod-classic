import { usePlayer } from "../hooks/usePlayer";
import NowPlaying from "../components/NowPlaying";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useEffect } from "react";

function NowPlayingPage(props) {
  const { isLoading, isError, data, error, remove } = usePlayer();

  // remove query from the cache on unmount. this allows for isLoading
  // to display true when transitioning between songs.
  useEffect(() => {
    return () => remove();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

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

  if (!data.body.item) {
    return <ErrorScreen status="Client Error" message="Invalid Item." />;
  }

  return (
    <NowPlaying
      item={data.body.item}
      progress_ms={data.body.progress_ms}
      isPlaying={data.body.is_playing}
    />
  );
}

export default NowPlayingPage;
