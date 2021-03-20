import { Redirect } from "@reach/router";
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

function parseHash(hash = "") {
  let params = hash.replace(/#/, "");
  params = params.split("&");
  params = params.reduce((result, param) => {
    const [key, value] = param.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value);
    return result;
  }, {});

  return params;
}

export default AuthCallback;
