import { useLocalStorage } from "react-use";

function useToken() {
  const tokenKey = "spotify-api-token";
  return useLocalStorage(tokenKey);
}

export { useToken };
