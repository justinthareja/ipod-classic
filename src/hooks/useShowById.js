import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/show.json";

function useShowById(showId) {
  const { user } = useUser();
  const query = useQuery(["shows", showId], () => spotifyApi.getShow(showId), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useShowById };
