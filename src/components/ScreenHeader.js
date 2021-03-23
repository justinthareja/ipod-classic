import BatteryIcon from "./BatteryIcon";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";

function ScreenHeader({ header, isPlaying }) {
  return (
    <div className="screen-header">
      <div className="header-icon">
        {isPlaying ? <PlayIcon /> : <PauseIcon />}
      </div>
      <div className="title truncate">{header}</div>
      <div className="header-icon">
        <BatteryIcon />
      </div>
    </div>
  );
}

export default ScreenHeader;
