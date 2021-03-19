import msToHuman from "../utils/msToHuman";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import PauseIcon from "./PauseIcon";
import result from "../stubs/track.json";

function NowPlaying() {
  return (
    <Screen>
      <ScreenHeader header={result.album.name} statusIcon={<PauseIcon />} />
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

export default NowPlaying;
