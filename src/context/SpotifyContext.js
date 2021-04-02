import { createContext, useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useToken } from "../hooks";

const config = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  state: "WeenitHutJr", // TODO: update this to be more secure
  response_type: "token",
  show_dialog: true,
  scopes: [
    "user-read-playback-position",
    "user-library-read",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-read-playback-state",
  ],
};

const BASE_URL = "https://accounts.spotify.com/authorize";
const url = new URL(BASE_URL);

url.searchParams.append("client_id", config.client_id);
url.searchParams.append("response_type", config.response_type);
url.searchParams.append("redirect_uri", config.redirect_uri);
url.searchParams.append("state", config.state);
url.searchParams.append("scope", config.scopes.join("%20"));
url.searchParams.append("show_dialog", config.show_dialog);

const authorizeURL = url.href;

const SpotifyContext = createContext();

function SpotifyClientProvider(props) {
  const [token] = useToken();
  const [spotifyClient] = useState(
    new SpotifyWebApi({
      redirectUri: config.redirectUri,
      clientId: config.client_id,
    })
  );

  useEffect(() => {
    if (!!token) {
      spotifyClient.setAccessToken(token);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SpotifyContext.Provider
      value={{
        spotifyClient,
        authorizeURL,
      }}
      {...props}
    />
  );
}

function useSpotifyClient() {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error(
      "useSpotifyClient() must be used within <SpotifyClientProvider>"
    );
  }
  return context;
}

export { SpotifyClientProvider, useSpotifyClient };
