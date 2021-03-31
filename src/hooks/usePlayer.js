import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";

function usePlayer() {
  const { user } = useUser();
  const query = useQuery(
    ["player"],
    async () => {
      const data = await spotifyApi.getMyCurrentPlaybackState();
      // Sometimes spotify returns without an item
      // this will trigger react-query's retry behavior
      if (data.statusCode === 200 && !data.body.item) {
        throw new Error("Current playback state responded with invalid item");
      }

      return data;
    },
    {
      enabled: !!user,
    }
  );

  return query.isIdle ? { data: { body: stub } } : query;
}

export { usePlayer };
