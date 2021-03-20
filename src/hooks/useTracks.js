import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/tracks.json";

function useTracks() {
  const { user } = useUser();
  const query = useQuery("tracks", () => spotifyApi.getMySavedTracks(), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useTracks };
