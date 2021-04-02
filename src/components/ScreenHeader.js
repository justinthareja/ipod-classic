import { useQueryClient } from "react-query";
import BatteryIcon from "./BatteryIcon";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";

function ScreenHeader({ header }) {
  const queryClient = useQueryClient();
  const player = queryClient.getQueryData("player");

  return (
    <div className="screen-header">
      <div className="header-icon">
        {!player || !player.body ? null : player.body.is_playing ? (
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
