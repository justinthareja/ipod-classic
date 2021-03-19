import { Router } from "@reach/router";
import AppProvider from "./context/index";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Music from "./pages/Music";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Songs from "./pages/Songs";
import NowPlaying from "./NowPlaying";
import Shows from "./pages/Shows";
import ShowDetails from "./pages/ShowDetails";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import LoginButton from "./LoginButton";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <div className="ipod">
        <LoginButton />
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
          <NowPlaying path="/episodes/:id" />
          <AuthCallback path="/callback" />
          <NotFound default />
        </Router>
        <Controls />
        <TouchWheel />
      </div>
    </AppProvider>
  );
}

export default App;
