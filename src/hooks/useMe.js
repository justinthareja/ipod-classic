import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";

function useMe({ enabled }) {
  const query = useQuery("me", () => spotifyApi.getMe(), {
    enabled,
  });

  return query;
}

export { useMe };
