import { useMutation } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";

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
