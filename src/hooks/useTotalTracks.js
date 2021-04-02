import get from "lodash/get";
import { useUser } from "../context/UserContext";
import { useQueryClient } from "react-query";

function useTotalTracks(props) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const player = queryClient.getQueryData("player");

  if (!user) {
    return 0;
  }
  if (!(player && player.body)) {
    return 0;
  }

  const { context } = player.body;

  if (!context) {
    const tracks = queryClient.getQueryData("tracks");

    return get(tracks, "body.total") || 0;
  } else {
    const { type, uri } = context;
    const listId = uri.split(":")[2];
    const list = queryClient.getQueryData([type, listId]);
    return get(list, "body.tracks.total") || 0;
  }
}

export { useTotalTracks };
