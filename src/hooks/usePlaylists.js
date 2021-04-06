import { useUser } from "../context/UserContext";
import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";
import stub from "../stubs/playlists.json";

function usePlaylists() {
  const { user } = useUser();
  const query = useQuery(
    "playlists",
    async () => {
      const data = await spotifyApi.getUserPlaylists();
      return mapDataToProps(data);
    },
    {
      enabled: !!user,
    }
  );

  return query.isIdle ? { data: { body: stub } } : query;
}

function mapDataToProps(data) {
  return data.body.items.map((playlist) => ({
    name: playlist.name,
    path: `/playlists/${playlist.id}`,
    showArrow: true,
    id: playlist.id,
  }));
}

export { usePlaylists };
