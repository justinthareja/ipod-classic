import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/albums.json";

function useAlbums() {
  const { user } = useUser();
  const query = useQuery("albums", () => spotifyApi.getMySavedAlbums(), {
    enabled: !!user,
  });

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useAlbums };
