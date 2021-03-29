import { useCallback, useEffect, useState } from "react";
import useInterval from "@use-it/interval";
import { usePlayPauseClick } from "../hooks/usePlayPauseClick";
import { useNextClick } from "../hooks";
import { usePause } from "../hooks/usePause";
import { usePlay } from "../hooks/usePlay";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import { formatTime } from "../utils/helpers";
import { useSkipToNext } from "../hooks/useSkipToNext";

function NowPlaying({ item, progress_ms, isPlaying }) {
  const [progress, setProgress] = useState(progress_ms);
  const delay = 1000;

  useEffect(() => {
    setProgress(progress_ms);
  }, [progress_ms]);

  useInterval(
    () => {
      setProgress(progress + delay);
    },
    isPlaying ? delay : null
  );

  const { mutate: pause } = usePause();
  const { mutate: play } = usePlay();
  const { mutate: skipToNext } = useSkipToNext();

  const playPauseHandler = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  usePlayPauseClick(playPauseHandler);

  const nextHandler = useCallback(() => {
    skipToNext();
  }, [skipToNext]);

  useNextClick(nextHandler);

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
            {formatTime(Math.min(progress, item.duration_ms))}
          </p>
          <p className="time-remaining">{formatTime(item.duration_ms)}</p>
        </div>
      </div>
    </Screen>
  );
}

export default NowPlaying;
