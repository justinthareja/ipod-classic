import { Redirect } from "@reach/router";
import parseHash from "../utils/parseHash";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function AuthCallback(props) {
  const params = parseHash(props.location.hash);
  const [, setToken] = useAuth();

  // TODO: check sent state === received state

  useEffect(() => {
    setToken(params.access_token);
  }, [params.access_token, setToken]);

  return <Redirect to="/" noThrow />;
}

export default AuthCallback;
