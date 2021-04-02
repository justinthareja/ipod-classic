import { createContext, useContext, useEffect } from "react";
import { useToken } from "../hooks";
import spotifyApi from "../api/spotifyApi";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken, removeToken] = useToken();

  const storeToken = (token) => setToken(token);
  const logout = () => removeToken();

  useEffect(() => {
    if (!!token) {
      spotifyApi.setAccessToken(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, storeToken, logout }} {...props} />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within <AuthProvider>");
  }
  return context;
}

export { AuthProvider, useAuth };
