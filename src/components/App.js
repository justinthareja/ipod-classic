import { Router } from "@reach/router";
import AppProvider from "../context/index";
import TouchWheel from "./TouchWheel";
import Controls from "./Controls";
import Music from "../pages/Music";
import Playlists from "../pages/Playlists";
import PlaylistDetails from "../pages/PlaylistDetails";
import Artists from "../pages/Artists";
import ArtistAlbums from "../pages/ArtistAlbums";
import Albums from "../pages/Albums";
import AlbumDetails from "../pages/AlbumDetails";
import Songs from "../pages/Songs";
import NowPlaying from "../pages/NowPlayingPage";
import Shows from "../pages/Shows";
import ShowDetails from "../pages/ShowDetails";
import AuthCallback from "../pages/AuthCallback";
import NotFound from "../pages/NotFound";
import LoginButton from "./LoginButton";
import ErrorBoundary from "./ErrorBoundary";
import Banner from "./Banner";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Banner />
      <LoginButton />
      <ToastContainer transition={Slide} autoClose={3000} hideProgressBar />
      <div className="ipod">
        <ErrorBoundary>
          <Router>
            <Music path="/" />
            <Playlists path="/playlists" />
            <PlaylistDetails path="/playlists/:id" />
            <Artists path="/artists" />
            <ArtistAlbums path="/artists/:id/albums" />
            <Albums path="/albums" />
            <AlbumDetails path="/albums/:id" />
            <Songs path="/songs" />
            <NowPlaying path="/songs/:id" />
            <Shows path="/shows" />
            <ShowDetails path="/shows/:id" />
            <NowPlaying path="/episodes/:id" />
            <NowPlaying path="now-playing" />
            <AuthCallback path="/callback" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
        <Controls />
        <TouchWheel />
      </div>
    </AppProvider>
  );
}

export default App;
