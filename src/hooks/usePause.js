import { useMutation } from "react-query";
import { useUser } from "../context/UserContext";
import { useStatus } from "../context/StatusContext";
import spotifyApi from "../api/spotifyApi";

function usePause() {
  const { user } = useUser();
  const { pause } = useStatus();
  const mutation = useMutation(() => spotifyApi.pause(), {
    onSuccess: () => {
      // updates app state to reflect api updates
      pause();
    },
  });

  return user ? mutation : { isSuccess: true, mutate: () => {} };
}

export { usePause };
