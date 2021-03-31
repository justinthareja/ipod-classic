import { useQuery } from "react-query";
import { useUser } from "../context/UserContext";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";

function usePlayer() {
  const { user } = useUser();
  const query = useQuery(
    ["player"],
    async () => {
      const data = await spotifyApi.getMyCurrentPlaybackState();
      // sometimes spotify returns without an item. throwing an error
      // will trigger react-query to execute retry behavior
      if (data.statusCode === 200 && !data.body.item) {
        throw new Error("Spotify returned data with no item");
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
