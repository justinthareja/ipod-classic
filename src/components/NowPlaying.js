import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import PlayIcon from "../components/PlayIcon";

function NowPlaying(props) {
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

  const { item } = data.body;

  return (
    <Screen>
      <ScreenHeader header={item.album.name} statusIcon={<PlayIcon />} />
      <div className="now-playing">
        <small className="track-count">
          {item.track_number} of {item.album.total_tracks}
        </small>
        <div className="track-info">
          <p className="track-name truncate">{item.name}</p>
          <p className="track-artist truncate">{item.artists[0].name}</p>
          <p className="track-album truncate">{item.album.name}</p>
        </div>
        <div className="playback">
          <div className="playback-progress"></div>
        </div>
        <div className="timestamps">
          <p className="time-played">1:00</p>
          <p className="time-remaining">{msToHuman(item.duration_ms)}</p>
        </div>
      </div>
    </Screen>
  );
}

function msToHuman(ms) {
  const date = new Date(ms);
  const minutes = date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${minutes}:${seconds}`;
}

export default NowPlaying;
