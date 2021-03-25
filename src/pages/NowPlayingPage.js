import { usePlayer } from "../hooks/usePlayer";
import NowPlaying from "../components/NowPlaying";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function NowPlayingPage(props) {
  const { isLoading, isError, data, error, refetch, isFetching } = usePlayer(
    props.id
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

  // sometimes the currently-playing response will be 200 but have no track
  // when this is the case, refetch
  if (!data || !data.body || !data.body.item) {
    if (!isFetching) {
      refetch();
    }

    return <LoadingScreen />;
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
