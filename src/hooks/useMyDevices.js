import { useQuery } from "react-query";
import spotifyApi from "../api/spotifyApi";

function useMyDevices({ enabled }) {
  const query = useQuery("devices", () => spotifyApi.getMyDevices(), {
    enabled,
  });

  return query;
}

export { useMyDevices };
