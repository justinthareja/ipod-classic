import { useMutation } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";

function usePause() {
  const { user } = useUser();
  const mutation = useMutation(() => spotifyApi.pause());

  return user ? mutation : { isSuccess: true };
}

export { usePause };
