import { Router, Link } from "@reach/router";
import TouchWheel, { TouchWheelProvider } from "./TouchWheel";
import Controls, { ControlsProvider } from "./Controls";
import Music from "./pages/Music";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Songs from "./pages/Songs";
import NowPlaying from "./NowPlaying";
import Shows from "./pages/Shows";
import ShowDetails from "./pages/ShowDetails";
import Episodes from "./pages/Episodes.js";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import spotifyLogo from "./assets/spotify-logo.png";

import "./App.css";

import spotifyApi, { authorizeURL } from "./api/spotifyApi";

function App() {
  return (
    <TouchWheelProvider>
      <ControlsProvider>
        <a className="login" href={authorizeURL}>
          <img className="spotify-logo" src={spotifyLogo} alt="Spotify logo" />
        </a>
        <div className="ipod">
          <Router>
            <Music path="/" />
            <Playlists path="/playlists" />
            <PlaylistDetails path="/playlists/:id" />
            <Albums path="/albums" />
            <AlbumDetails path="/albums/:id" />
            <Songs path="/songs" />
            <NowPlaying path="/songs/:id" />
            <Shows path="/shows" />
            <ShowDetails path="/shows/:id" />
            <Episodes path="/episodes" />
            <AuthCallback path="/callback" />
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
