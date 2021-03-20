import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/artists.json";

function useArtists() {
  const { user } = useUser();
  const query = useQuery("artists", () => spotifyApi.getMyTopArtists(), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useArtists };
