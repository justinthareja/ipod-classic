import get from "lodash/get";
import { usePlayer } from "../hooks/usePlayer";
import NowPlaying from "../components/NowPlaying";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function NowPlayingPage(props) {
  const { isLoading, isError, data, error } = usePlayer();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        status={get(error, "body.error.status")}
        message={get(error, "body.error.message")}
      />
    );
  }

  if (data.statusCode === 204) {
    return <ErrorScreen status="204" message="No song found." />;
  }

  if (!data.body.item) {
    return <LoadingScreen />;
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
