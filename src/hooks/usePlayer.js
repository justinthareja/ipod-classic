import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import { useStatus } from "../context/StatusContext";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";

function usePlayer(trackId) {
  const { user } = useUser();
  const { play, pause } = useStatus();
  const query = useQuery(
    ["player", trackId],
    () => spotifyApi.getMyCurrentPlaybackState(),
    {
      enabled: !!user,
      // updates app status based on response
      onSuccess: (data) => {
        if (data && data.body && data.body.is_playing) {
          play();
        } else {
          pause();
        }
      },
    }
  );

  return query.isIdle ? { data: { body: stub }, refetch: () => {} } : query;
}

export { usePlayer };
