import { Router } from "@reach/router";
import EVT from "./lib/EVT";
import "./App.css";
import TouchWheel from "./components/TouchWheel";
import Controls from "./components/Controls";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Extras from "./pages/Extras";
import Games from "./pages/Games";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import NotFound from "./pages/NotFound";

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
        <Playlists path="/playlists" />
        <PlaylistDetails path="/playlists/:id" />
        <Extras path="/extras" />
        <Games path="/games" />
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
