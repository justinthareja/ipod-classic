import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";

function usePlayer() {
  const { user } = useUser();
  const query = useQuery(
    ["player"],
    () => spotifyApi.getMyCurrentPlaybackState(),
    {
      enabled: !!user,
    }
  );

  return query.isIdle ? { data: { body: stub }, refetch: () => {} } : query;
}

export { usePlayer };
