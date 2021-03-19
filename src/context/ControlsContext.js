import { useContext, createContext, useState, useEffect, useMemo } from "react";

const ControlsContext = createContext();

export function ControlsProvider(props) {
  const [handleMenu, setHandleMenu] = useState(null);
  const value = useMemo(
    () => ({
      handleMenu,
      setHandleMenu,
    }),
    [handleMenu]
  );

  return <ControlsContext.Provider value={value} {...props} />;
}
export function useControls() {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error("Must useControls within <ControlsProvider>");
  }
  return context;
}

export function useMenu(handleMenu) {
  const { setHandleMenu } = useControls();

  useEffect(() => {
    setHandleMenu(() => handleMenu);
  }, [handleMenu, setHandleMenu]);
}
