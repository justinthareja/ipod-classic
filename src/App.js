import { Router } from "@reach/router";
import EVT from "./lib/EVT";
import "./App.css";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Home from "./Home";
import Music from "./Music";
import NotFound from "./NotFound";

function App() {
  function handleTouchWheelClick() {
    EVT.emit("wheel:click");
  }

  function handleTouchWheelTick(tick) {
    EVT.emit("wheel:tick", tick);
  }

  function handleMenuClick() {
    EVT.emit("controls:menu");
  }

  return (
    <div className="ipod">
      <Router>
        <Home path="/" />
        <Music path="/music" />
        <NotFound default />
      </Router>
      <Controls onMenuClick={handleMenuClick} />
      <TouchWheel
        onClick={handleTouchWheelClick}
        onTick={handleTouchWheelTick}
      />
    </div>
  );
}

export default App;
