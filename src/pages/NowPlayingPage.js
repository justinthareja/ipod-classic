import { useCallback } from "react";
import get from "lodash/get";
import { usePlayer } from "../hooks/usePlayer";
import { useTotalTracks, useCurrentTrackNumber } from "../hooks";
import NowPlaying from "../components/NowPlaying";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

function NowPlayingPage(props) {
  const { isLoading, isError, data, error, refetch } = usePlayer();
  const totalTracks = useTotalTracks();
  const currentTrackNumber = useCurrentTrackNumber();
  const onSongEnd = useCallback(() => refetch(), []); // eslint-disable-line react-hooks/exhaustive-deps

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
      trackNumber={currentTrackNumber}
      totalTracks={totalTracks}
      volume={data.body.device.volume_percent}
      item={data.body.item}
      progress_ms={data.body.progress_ms}
      isPlaying={data.body.is_playing}
      onSongEnd={onSongEnd}
    />
  );
}

export default NowPlayingPage;
