import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/playlists.json";

function usePlaylists() {
  const { user } = useUser();
  const query = useQuery("playlists", () => spotifyApi.getUserPlaylists(), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { usePlaylists };
