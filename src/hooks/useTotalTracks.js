import get from "lodash/get";
import { useUser } from "../context/UserContext";
import { useQueryClient } from "react-query";

function useTotalTracks(props) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const player = queryClient.getQueryData("player");

  // placeholder for unauthenticated apps
  if (!user) {
    return 12;
  }

  if (!(player && player.body)) {
    return null;
  }

  const { context } = player.body;

  // determine where the song came from
  if (!context) {
    // its from <Songs> (or it could be some other spotify auto play feature)
    // that this doesn't handle proper;y
    const tracks = queryClient.getQueryData("tracks");
    return get(tracks, "body.total");
  } else {
    // its from a list
    const { type, uri } = context;

    // uri is now a spotify context uri with signature like
    // spotify:album:D1GJK94ABW26ZVWVI6
    const listId = uri.split(":")[2];

    // get list from cache
    const list = queryClient.getQueryData([type, listId]);

    return get(list, "body.tracks.total");
  }
}

export { useTotalTracks };
