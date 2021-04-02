import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/playlist.json";

function usePlaylistById(playlistId) {
  const { user } = useUser();
  const query = useQuery(
    ["playlist", playlistId],
    () => spotifyApi.getPlaylist(playlistId),
    { enabled: !!user && !!playlistId }
  );

  return query.isIdle ? { data: { body: stub } } : query;
}

export { usePlaylistById };
