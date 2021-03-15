import { useEffect } from "react";
import { useNavigate } from "@reach/router";
import EVT from "../lib/EVT";

function Screen({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    EVT.on("controls:menu", handleMenuClick);

    function handleMenuClick() {
      navigate(-1);
    }

    return function cleanup() {
      EVT.removeListener("controls:menu");
    };
  });

  return (
    <div className="screen-container">
      <div className="screen">{children}</div>
    </div>
  );
}

export default Screen;
