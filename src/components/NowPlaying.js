import { useCallback, useEffect, useState } from "react";
import useInterval from "@use-it/interval";
import { usePlayPauseClick } from "../hooks/usePlayPauseClick";
import { usePause } from "../hooks/usePause";
import { usePlay } from "../hooks/usePlay";
import { useStatus } from "../context/StatusContext";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";

function NowPlaying({ item, progress_ms }) {
  const status = useStatus();
  const [progress, setProgress] = useState(progress_ms);
  const interval = 1000;

  useEffect(() => {
    setProgress(progress_ms);
  }, [progress_ms]);

  useInterval(
    () => {
      setProgress(progress + interval);
    },
    status.state === "playing" ? interval : null
  );

  const pause = usePause();
  const play = usePlay();
  const playPauseHandler = useCallback(() => {
    if (status.state === "playing") {
      pause.mutate();
    } else {
      play.mutate({
        uris: [`spotify:track:${item.id}`],
        position_ms: progress,
      });
    }
  }, [item.id, status.state, progress]); //eslint-disable-line react-hooks/exhaustive-deps

  usePlayPauseClick(playPauseHandler);

  return (
    <Screen>
      <ScreenHeader header={item.album.name} />
      <div className="now-playing">
        <small className="track-count">
          {item.track_number} of {item.album.total_tracks}
        </small>
        <div className="track-info">
          <p className="track-name truncate">{item.name}</p>
          {/* TODO, give all artists credit */}
          <p className="track-artist truncate">{item.artists[0].name}</p>
          <p className="track-album truncate">{item.album.name}</p>
        </div>
        <div className="playback">
          <div
            className="playback-progress"
            style={{
              width: `${Math.min(100, (progress / item.duration_ms) * 100)}%`,
            }}
          ></div>
        </div>
        <div className="timestamps">
          <p className="time-played">
            {msToHuman(Math.min(progress, item.duration_ms))}
          </p>
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