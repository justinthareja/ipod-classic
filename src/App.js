import { Router } from "@reach/router";
import TouchWheel, { TouchWheelProvider } from "./TouchWheel";
import Controls, { ControlsProvider } from "./Controls";
import Music from "./pages/Music";
import Playlists from "./Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Songs from "./pages/Songs";
import Shows from "./pages/Shows";
import ShowDetails from "./pages/ShowDetails";
import Episodes from "./pages/Episodes.js";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <TouchWheelProvider>
      <ControlsProvider>
        <div className="ipod">
          <Router>
            <Music path="/" />
            <Playlists path="/playlists" />
            <PlaylistDetails path="/playlists/:id" />
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
