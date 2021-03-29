import { useUser } from "../context/UserContext";
import { useQuery, useQueryClient } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";

function usePlayer() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const query = useQuery(
    ["player"],
    () => spotifyApi.getMyCurrentPlaybackState(),
    {
      enabled: !!user,
      onSuccess: async (data) => {
        // Sometimes spotify returns without an item
        if (data.statusCode === 200 && !data.body.item) {
          await queryClient.invalidateQueries("player");
        }
      },
    }
  );

  return query.isIdle ? { data: { body: stub }, refetch: () => {} } : query;
}

export { usePlayer };
