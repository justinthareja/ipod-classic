import { createContext, useContext, useEffect, useCallback } from "react";
import { useQueryClient } from "react-query";
import { navigate } from "@reach/router";
import { toast } from "react-toastify";
import { useToken } from "../hooks";
import spotifyApi from "../api/spotifyApi";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken, removeToken] = useToken();
  const queryClient = useQueryClient();

  const storeToken = (token) => {
    setToken(token);
  };

  const logout = useCallback(() => {
    removeToken();
    queryClient.clear();
    navigate("/");
    toast.success("Successfully logged out");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
