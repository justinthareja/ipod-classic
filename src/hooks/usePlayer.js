import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/player.json";
import { useNoop } from "../utils/helpers";

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
  const fakeRemove = useNoop();

  return query.isIdle ? { data: { body: stub }, remove: fakeRemove } : query;
}

export { usePlayer };
