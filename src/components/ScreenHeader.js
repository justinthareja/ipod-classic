import { useStatus } from "../context/StatusContext";
import BatteryIcon from "./BatteryIcon";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";

function ScreenHeader({ header }) {
  const status = useStatus();

  return (
    <div className="screen-header">
      <div className="header-icon">
        {status.state === "playing" && <PlayIcon />}
        {status.state === "paused" && <PauseIcon />}
      </div>
      <div className="title truncate">{header}</div>
      <div className="header-icon">
        <BatteryIcon />
      </div>
    </div>
  );
}

export default ScreenHeader;
