import { useUser } from "../context/UserContext";
import LoadComponent from "../components/LoadComponent";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import ErrorScreen from "../components/ErrorScreen";
import PlayIcon from "./PlayIcon";
import msToHuman from "../utils/msToHuman";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/track.json";

function NowPlaying({ result }) {
  return (
    <Screen>
      <ScreenHeader header={result.album.name} statusIcon={<PlayIcon />} />
      <div className="now-playing">
        <small className="track-count">
          {result.track_number} of {result.album.total_tracks}
        </small>
        <div className="track-info">
          <p className="track-name truncate">{result.name}</p>
          <p className="track-artist truncate">{result.artists[0].name}</p>
          <p className="track-album truncate">{result.album.name}</p>
        </div>
        <div className="playback">
          <div className="playback-progress"></div>
        </div>
        <div className="timestamps">
          <p className="time-played">1:00</p>
          <p className="time-remaining">{msToHuman(result.duration_ms)}</p>
        </div>
      </div>
    </Screen>
  );
}

function LoadNowPlaying(props) {
  const { user } = useUser();

  return user ? (
    <LoadComponent
      renderSuccess={({ body }) => <NowPlaying result={body.item} />}
      renderError={({ body }) => (
        <ErrorScreen status={body.error.status} message={body.error.message} />
      )}
      query={{
        queryKey: "current",
        queryFn: () => spotifyApi.getMyCurrentPlayingTrack(),
      }}
    />
  ) : (
    <NowPlaying result={stub} />
  );
}

export default LoadNowPlaying;
