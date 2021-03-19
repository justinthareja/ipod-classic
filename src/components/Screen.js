import { useCallback } from "react";
import { useNavigate, useLocation } from "@reach/router";
import { useMenu } from "./Controls";

function Screen({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = useCallback(() => {
    if (location.pathname === "/") {
      return;
    }
    navigate(-1);
  }, [location.pathname, navigate]);

  useMenu(handleMenu);
  return (
    <div className="screen-container">
      <div className="screen">{children}</div>
    </div>
  );
}

export default Screen;
