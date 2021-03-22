import { useCallback } from "react";
import { navigate, useLocation } from "@reach/router";
import { useMenu } from "../hooks/useMenu";

function Screen({ children }) {
  const location = useLocation();

  const handleMenuClick = useCallback(() => {
    if (location.pathname === "/") {
      return;
    }

    navigate(-1);
  }, [location.pathname]);

  useMenu(handleMenuClick);

  return (
    <div className="screen-container">
      <div className="screen">{children}</div>
    </div>
  );
}

export default Screen;
