import { navigate, useLocation } from "@reach/router";
import { useMenu } from "../hooks/useMenu";

function Screen({ children }) {
  const location = useLocation();

  useMenu(() => {
    if (location.pathname === "/") {
      return;
    }

    navigate(-1);
  });

  return (
    <div className="screen-container">
      <div className="screen">{children}</div>
    </div>
  );
}

export default Screen;
