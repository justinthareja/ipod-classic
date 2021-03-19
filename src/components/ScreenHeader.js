import BatteryIcon from "./BatteryIcon";

function ScreenHeader({ statusIcon, header }) {
  return (
    <div className="screen-header">
      <div className="header-icon">{statusIcon}</div>
      <div className="title truncate">{header}</div>
      <div className="header-icon">
        <BatteryIcon />
      </div>
    </div>
  );
}

export default ScreenHeader;
