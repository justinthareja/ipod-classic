import { Redirect } from "@reach/router";
import spotifyApi from "../api/spotifyApi";
import parseHash from "../utils/parseHash";

function AuthCallback(props) {
  const params = parseHash(props.location.hash);
  // TODO: check sent state === received state
  spotifyApi.setAccessToken(params.access_token);
  return <Redirect to="/" noThrow />;
}

export default AuthCallback;
