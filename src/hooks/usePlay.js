import { useMutation } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";

/* 
TODO: update this with the correct context. right now play
seems to remove any sort of queue and creates its own context
where only that song plays in a `1 of 1` situation. playing
the next song will just do nothing.
*/
function usePlay() {
  const { user } = useUser();
  const mutation = useMutation((trackId) =>
    spotifyApi.play({
      uris: [`spotify:track:${trackId}`],
    })
  );

  return user ? mutation : { isSuccess: true };
}

export { usePlay };
