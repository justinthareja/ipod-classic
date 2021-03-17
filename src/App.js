import { Router } from "@reach/router";
import TouchWheel, { TouchWheelProvider } from "./TouchWheel";
import Controls, { ControlsProvider } from "./Controls";
import Music from "./Music";
import Playlists from "./Playlists";
import Albums from "./Albums";
import AlbumDetails from "./AlbumDetails";
import Songs from "./Songs";
import Shows from "./Shows";
import ShowDetails from "./ShowDetails";
import Episodes from "./Episodes.js";
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
            <Albums path="/albums" />
            <AlbumDetails path="/albums/:id" />
            <Songs path="/songs" />
            {/* TODO <NowPlaying path="/songs/:id" />  */}
            <Shows path="/shows" />
            <ShowDetails path="/shows/:id" />
            <Episodes path="/episodes" />
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
