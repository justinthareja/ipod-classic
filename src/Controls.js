import { useContext, createContext, useState, useEffect, useMemo } from "react";

const ControlsContext = createContext();

export default function Controls(props) {
  const context = useContext(ControlsContext);
  const { handleMenu } = context;
  return (
    <div className="controls">
      <div className="control">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon rewind"
          viewBox="0 0 100 125"
        >
          <g>
            <polygon points="90.25,30.239 73.322,40.451 56.025,50 73.322,59.557 90.242,69.761 89.864,50  " />
            <polygon points="56.025,30.239 39.101,40.451 22.107,49.83 22.107,30.239 10.25,30.239 10.25,69.761 22.107,69.761 22.107,50.17    39.101,59.553 56.025,69.761 55.639,50  " />
          </g>
        </svg>
      </div>
      <div className="control" onClick={handleMenu}>
        MENU
      </div>
      <div className="control">
        <svg
          className="icon playpause"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 125"
        >
          <polygon points="4.948,21.713 53.945,50.002 4.948,78.286 " />
          <rect x="53.945" y="21.713" width="15.478" height="56.573" />
          <rect x="80.77" y="21.713" width="15.48" height="56.573" />
        </svg>
      </div>
      <div className="control">
        <svg
          className="icon fast-forward"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 125"
        >
          <g>
            <polygon points="10.25,69.761 27.178,59.549 44.475,50 27.178,40.443 10.258,30.239 10.636,50  " />
            <polygon points="44.475,69.761 61.399,59.549 78.393,50.169 78.393,69.761 90.25,69.761 90.25,30.239 78.393,30.239 78.393,49.83    61.399,40.447 44.475,30.239 44.861,50  " />
          </g>
        </svg>
      </div>
    </div>
  );
}

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

export function useMenu(handleMenu) {
  const context = useContext(ControlsContext);
  const { setHandleMenu } = context;

  useEffect(() => {
    setHandleMenu(() => handleMenu);
  }, [handleMenu, setHandleMenu]);
}
