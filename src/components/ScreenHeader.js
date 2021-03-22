import BatteryIcon from "./BatteryIcon";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";
import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";

function ScreenHeader({ header }) {
  const { data } = useCurrentlyPlaying();
  return (
    <div className="screen-header">
      <div className="header-icon">
        {data && data.body && data.body.is_playing ? (
          <PlayIcon />
        ) : (
          <PauseIcon />
        )}
      </div>
      <div className="title truncate">{header}</div>
      <div className="header-icon">
        <BatteryIcon />
      </div>
    </div>
  );
}

export default ScreenHeader;
