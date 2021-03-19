import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import spotifyApi from "../api/spotifyApi";

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    async function fetchUser() {
      const response = await spotifyApi.getMe();
      setUser(response.body);
    }

    fetchUser();
  }, [token]);

  return <UserContext.Provider value={{ user }} {...props} />;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser() must be used within <UserProvider>");
  }
  return context;
}

export { UserProvider, useUser };
