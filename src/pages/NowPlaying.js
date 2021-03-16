import { useState, useEffect, useRef } from "react";
import EVT from "../lib/EVT";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import PlayIcon from "../components/PlayIcon";
import PauseIcon from "../components/PauseIcon";
import nowPlaying from "../stubs/nowPlaying.json";

function NowPlaying({ trackNumber = 4, totalTracks = 10 }) {
  const timeoutRef = useRef(null);
  const [progress, setProgress] = useState(nowPlaying.progress_ms);
  const [isPlaying, setIsPlaying] = useState(nowPlaying.is_playing);

  function formatTime(ms) {
    const date = new Date(ms);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setProgress(Math.min(progress + 1000, nowPlaying.item.duration_ms));
    }, 1000);

    if (progress >= nowPlaying.item.duration_ms) {
      clearTimeout(timeoutRef.current);
      // go to next song
    }

    return function cleanup() {
      clearTimeout(timeoutRef.current);
    };
  }, [progress]);

  useEffect(() => {
    EVT.on("controls:play", handlePlayClick);

    function handlePlayClick() {
      setIsPlaying(!isPlaying);
    }

    return function cleanup() {
      EVT.removeListener("controls:play");
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => {
        setProgress((p) => Math.min(p + 1000, nowPlaying.item.duration_ms));
      }, 1000);
    }
  }, [isPlaying]);

  return (
    <Screen>
      <ScreenHeader
        header={nowPlaying.item.artists[0].name}
        statusIcon={isPlaying ? <PlayIcon /> : <PauseIcon />}
      />
      <div className="now-playing">
        <div className="count">
          {trackNumber} of {totalTracks}
        </div>
        <div className="track-info">
          <div className="track-name">{nowPlaying.item.name}</div>
          <div className="track-album">{nowPlaying.item.album.name}</div>
          <div className="track-artist">{nowPlaying.item.artists[0].name}</div>
        </div>
        <div className="player">
          <div
            className="player-progress"
            style={{
              width: `${(progress / nowPlaying.item.duration_ms) * 100}%`,
            }}
          ></div>
        </div>
        <div className="timestamps">
          <div className="start">{formatTime(progress)}</div>
          <div className="end">{`-${formatTime(
            nowPlaying.item.duration_ms - progress
          )}`}</div>
        </div>
      </div>
    </Screen>
  );
}

export default NowPlaying;
