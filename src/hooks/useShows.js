import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/shows.json";

function useShows() {
  const { user } = useUser();
  const query = useQuery("shows", () => spotifyApi.getMySavedShows(), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useShows };
