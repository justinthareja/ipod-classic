import { useUser } from "../context/UserContext";
import { authorizeURL } from "../api/spotifyApi";
function Banner() {
  const { user } = useUser();
  if (user) {
    return null;
  }

  return (
    <div className="banner">
      <h1>Demo Mode</h1>
      <p>
        <em>
          Offline data is poorly mocked from the author's spotify account.
          Functionality is limited.
        </em>
      </p>
      <p>
        Play around to get a feel for the touch wheel and controls. Log into
        your spotify account for the full experience.
      </p>
      <a className="banner-login" href={authorizeURL}>
        Log In
      </a>
    </div>
  );
}

export default Banner;
