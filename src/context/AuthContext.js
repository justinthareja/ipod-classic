import * as React from "react";
import spotifyApi from "../api/spotifyApi";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [token, setToken] = React.useState(null);
  const value = React.useMemo(() => [token, setToken], [token]);

  React.useEffect(() => {
    if (token !== null) {
      spotifyApi.setAccessToken(token);
      console.log("client has token, ready to rock");
    }
  }, [token]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within <AuthProvider>");
  }
  return context;
}

export { AuthProvider, useAuth };
