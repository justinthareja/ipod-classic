import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";
import NowPlaying from "../components/NowPlaying";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function NowPlayingPage(props) {
  const { isLoading, isError, data, error } = useCurrentlyPlaying();

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

  if (!data || !data.body || !data.body.item) {
    console.error(data);
    return <ErrorScreen status="500" message="Client error." />;
  }

  return (
    <NowPlaying
      item={data.body.item}
      progress_ms={data.body.progress_ms}
      is_playing={data.body.is_playing}
    />
  );
}

export default NowPlayingPage;
