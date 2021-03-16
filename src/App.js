import { Router } from "@reach/router";
import EVT from "./lib/EVT";
import "./App.css";
import TouchWheel, { TouchWheelProvider } from "./TouchWheel";
import Controls from "./Controls";
import Music from "./Music";
import Playlists from "./Playlists";

function App() {
  function handleTouchWheelClick() {
    EVT.emit("wheel:click");
  }

  function handleMenuClick() {
    EVT.emit("controls:menu");
  }

  return (
    <TouchWheelProvider>
      <div className="ipod">
        <Router>
          <Music path="/" />
          <Playlists path="/playlists" />
        </Router>
        <Controls onMenuClick={handleMenuClick} />
        <TouchWheel onClick={handleTouchWheelClick} />
      </div>
    </TouchWheelProvider>
  );
}

export default App;
