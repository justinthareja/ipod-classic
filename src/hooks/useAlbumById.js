import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/album.json";

function useAlbumById(albumId) {
  const { user } = useUser();
  const query = useQuery(
    ["album", albumId],
    () => spotifyApi.getAlbum(albumId),
    { enabled: !!user && !!albumId }
  );

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useAlbumById };
