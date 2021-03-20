import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/artist-albums.json";

function useAlbumsByArtist(artistId) {
  const { user } = useUser();
  const query = useQuery(
    ["artists", artistId, "albums"],
    () => spotifyApi.getArtistAlbums(artistId),
    {
      enabled: !!user,
    }
  );

  return query.isIdle ? { data: { body: stub } } : query;
}

export { useAlbumsByArtist };
