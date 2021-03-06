import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/currently-playing.json";

function useCurrentlyPlaying(trackId) {
  const { user } = useUser();
  const query = useQuery(
    ["currently-playing", trackId],
    () => spotifyApi.getMyCurrentPlayingTrack(),
    {
      enabled: !!user,
    }
  );

  return query.isIdle ? { data: { body: stub }, refetch: () => {} } : query;
}

export { useCurrentlyPlaying };
