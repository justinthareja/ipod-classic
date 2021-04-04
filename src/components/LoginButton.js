import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { authorizeURL } from "../api/spotifyApi";
import spotifyLogo from "../assets/spotify-logo.png";

function LoginButton() {
  const { user } = useUser();
  const { logout } = useAuth();
  return (
    <div className="login-container">
      {user ? (
        <button className="logout-button" onClick={logout}>
          <img
            className="login-pic profile"
            src={user.images[0].url}
            alt="Profile"
          />
        </button>
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
