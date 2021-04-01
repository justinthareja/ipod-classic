import { useCallback, useEffect, useState } from "react";
import useInterval from "@use-it/interval";
import { useTimeoutFn } from "react-use";
import { usePlayPauseClick } from "../hooks/usePlayPauseClick";
import { usePause } from "../hooks/usePause";
import { usePlay } from "../hooks/usePlay";
import { useSkipToNext } from "../hooks/useSkipToNext";
import { useSkipToPrevious } from "../hooks/useSkipToPrevious";
import { useTouchWheelTick } from "../hooks/useTouchWheelTick";
import { useNextClick, usePreviousClick, useVolume } from "../hooks";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import { formatTime } from "../utils/helpers";
import VolumeUpIcon from "./VolumeUpIcon";
import VolumeDownIcon from "./VolumeDownIcon";

function NowPlaying({ item, progress_ms, isPlaying, volume }) {
  const [progress, setProgress] = useState(progress_ms);
  const delay = 1000;

  useEffect(() => {
    setProgress(progress_ms);
  }, [progress_ms]);

  // TODO: implement usePlayPauseClick like this
  useInterval(
    () => {
      setProgress(progress + delay);
    },
    isPlaying ? delay : null
  );

  // TODO: register these handlers outside of this component. right now
  // they are all getting re-registered every second
  const { mutate: pause } = usePause();
  const { mutate: play } = usePlay();
  const { mutate: skipToNext } = useSkipToNext();
  const { mutate: skipToPrevious } = useSkipToPrevious();

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

  const previousHandler = useCallback(() => {
    skipToPrevious();
  }, [skipToPrevious]);

  usePreviousClick(previousHandler);

  const [barType, setBarType] = useState("progress");
  const toggleBarType = (type) => {
    const validTypes = ["seek", "volume", "progress"];
    if (!validTypes.includes(type)) {
      throw new Error("Invalid bar type");
    }

    return () => {
      if (barType !== type) {
        setBarType(type);
      }
    };
  };
  const toggleVolumeBar = toggleBarType("volume");
  const toggleProgressBar = toggleBarType("progress");

  const [barTimeout] = useState(2000);
  const [, cancelBarTimeout, resetBarTimeout] = useTimeoutFn(
    toggleProgressBar,
    barTimeout
  );

  useEffect(() => {
    cancelBarTimeout();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { mutate: mutateVolume } = useVolume();
  const [volumeStep] = useState(5);

  useTouchWheelTick(({ direction }) => {
    // switch to volume bar if it's not already toggled
    toggleVolumeBar();
    resetBarTimeout();

    // make the api call to turn up
    if (direction === "clockwise" && volume < 100) {
      mutateVolume(volume + volumeStep);
    }

    // make the api call to turn down
    if (direction === "anticlockwise" && volume > 0) {
      mutateVolume(volume - volumeStep);
    }
  });

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
        {barType === "progress" && (
          <div className="playback">
            <div
              className="playback-progress"
              style={{
                width: `${Math.min(100, (progress / item.duration_ms) * 100)}%`,
              }}
            ></div>
            <div className="timestamps">
              <p className="time-played">
                {formatTime(Math.min(progress, item.duration_ms))}
              </p>
              <p className="time-remaining">
                -{formatTime(Math.max(0, item.duration_ms - progress))}
              </p>
            </div>
          </div>
        )}
        {barType === "volume" && (
          <div className="volume-wrapper">
            <VolumeDownIcon height="13" />
            <div className="playback is-volume">
              <div
                className="playback-volume"
                style={{
                  width: `${Math.min(100, volume)}%`,
                }}
              ></div>
            </div>
            <VolumeUpIcon height="12" />
          </div>
        )}
      </div>
    </Screen>
  );
}

export default NowPlaying;
