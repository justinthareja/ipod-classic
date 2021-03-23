import { useMutation } from "react-query";
import { useUser } from "../context/UserContext";
import { useStatus } from "../context/StatusContext";
import spotifyApi from "../api/spotifyApi";

/* 
TODO: update this with the correct context. right now play
seems to remove any sort of queue and creates its own context
where only that song plays in a `1 of 1` situation. playing
the next song will just do nothing.
*/
function usePlay() {
  const { user } = useUser();
  const { play } = useStatus();
  const mutation = useMutation((options) => spotifyApi.play(options), {
    onSuccess: () => {
      // updates app state to reflect spotify status
      play();
    },
  });

  return user ? mutation : { isSuccess: true, mutate: () => {} };
}

export { usePlay };
