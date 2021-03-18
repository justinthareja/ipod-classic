import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const state = "WeenieHutJr";
const responseType = "token";
const showDialog = true;
const scopes = [
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
];

const BASE_URL = "https://accounts.spotify.com/authorize";
const url = new URL(BASE_URL);

url.searchParams.append("client_id", clientId);
url.searchParams.append("response_type", responseType);
url.searchParams.append("redirect_uri", redirectUri);
url.searchParams.append("state", state);
url.searchParams.append("scope", scopes.join("%20"));
url.searchParams.append("show_dialog", showDialog);

const authorizeURL = url.href;

const spotifyApi = new SpotifyWebApi({
  redirectUri,
  clientId,
});

export { authorizeURL };
export default spotifyApi;
