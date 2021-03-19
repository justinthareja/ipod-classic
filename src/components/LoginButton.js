import { useUser } from "../context/UserContext";
import { authorizeURL } from "../api/spotifyApi";
import spotifyLogo from "../assets/spotify-logo.png";

function LoginButton() {
  const { user } = useUser();
  return (
    <div className="login-container">
      {user ? (
        <img
          className="login-pic profile"
          src={user.images[0].url}
          alt="Profile"
        />
      ) : (
        <a className="login-button" href={authorizeURL}>
          <img
            className="login-pic spotify-logo"
            src={spotifyLogo}
            alt="Spotify logo"
          />
        </a>
      )}
    </div>
  );
}

export default LoginButton;
