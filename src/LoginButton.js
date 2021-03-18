import { useAuth } from "./context/AuthContext";
import { authorizeURL } from "./api/spotifyApi";
import spotifyLogo from "./assets/spotify-logo.png";

function LoginButton() {
  const [token] = useAuth();
  return token ? null : (
    <a className="login" href={authorizeURL}>
      <img className="spotify-logo" src={spotifyLogo} alt="Spotify logo" />
    </a>
  );
}

export default LoginButton;
