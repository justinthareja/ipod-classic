import { createContext, useState, useContext } from "react";
import spotifyApi from "../api/spotifyApi";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(null);

  const storeToken = (token) => {
    setToken(token);
    spotifyApi.setAccessToken(token);
  };

  return <AuthContext.Provider value={{ token, storeToken }} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within <AuthProvider>");
  }
  return context;
}

export { AuthProvider, useAuth };
