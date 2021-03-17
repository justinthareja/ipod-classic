import { Router } from "@reach/router";
import TouchWheel, { TouchWheelProvider } from "./TouchWheel";
import Controls, { ControlsProvider } from "./Controls";
import Music from "./Music";
import Playlists from "./Playlists";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <TouchWheelProvider>
      <ControlsProvider>
        <div className="ipod">
          <Router>
            <Music path="/" />
            <Playlists path="/playlists" />
            <NotFound default />
          </Router>
          <Controls />
          <TouchWheel />
        </div>
      </ControlsProvider>
    </TouchWheelProvider>
  );
}

export default App;
