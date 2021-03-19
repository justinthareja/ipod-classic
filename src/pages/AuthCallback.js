import { Redirect } from "@reach/router";
import parseHash from "../utils/parseHash";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function AuthCallback(props) {
  const params = parseHash(props.location.hash);
  const { storeToken } = useAuth();

  // TODO: check sent state === received state
  useEffect(() => {
    if (!params.access_token) {
      throw new Error(
        "<AuthCallback/> mounted without access token in query params"
      );
    }

    storeToken(params.access_token);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <Redirect to="/" noThrow />;
}

export default AuthCallback;
