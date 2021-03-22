import { useEffect, useCallback } from "react";
import { useControls } from "../context/ControlsContext";

export function useMenu(onMenuClick) {
  const { setHandleMenu } = useControls();
  const menuHandler = useCallback(() => onMenuClick, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setHandleMenu(menuHandler);

    return function cleanup() {
      setHandleMenu(() => {});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
