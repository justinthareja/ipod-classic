import { useCallback, useEffect, useState } from "react";
import { usePlayPauseClick } from "../hooks/usePlayPauseClick";
import { usePause } from "../hooks/usePause";
import { usePlay } from "../hooks/usePlay";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";

function NowPlaying({ item, progress_ms, is_playing }) {
  const [progress, setProgress] = useState(progress_ms);
  const [isPlaying, setIsPlaying] = useState(is_playing);
  const interval = 1000;
  const pause = usePause();
  const play = usePlay();

  // this is only necessary because for some reason when a song is played
  // this component is rendered initially with the previous tracks' progress
  useEffect(() => {
    setProgress(progress_ms);
  }, [progress_ms]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((currentProgress) => currentProgress + interval);
    }, interval);

    if (!isPlaying) {
      return clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const playPauseHandler = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      pause.mutate();
    } else {
      setIsPlaying(true);
      // update the api
      play.mutate({
        uris: [`spotify:track:${item.id}`],
        position_ms: progress,
      });
    }
  }, [isPlaying, item.id]); // TODO: figure out how to properly add the dependencies

  usePlayPauseClick(playPauseHandler);

  return (
    <Screen>
      <ScreenHeader header={item.album.name} isPlaying={isPlaying} />
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
            style={{ width: `${(progress / item.duration_ms) * 100}%` }}
          ></div>
        </div>
        <div className="timestamps">
          <p className="time-played">{msToHuman(progress)}</p>
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
