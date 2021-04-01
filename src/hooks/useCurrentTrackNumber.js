import get from "lodash/get";
import { useUser } from "../context/UserContext";
import { useQueryClient } from "react-query";

function useCurrentTrackNumber() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const player = queryClient.getQueryData("player");

  // placeholder for unauthenticated apps
  if (!user) {
    return 1;
  }

  if (!(player && player.body)) {
    // player doesn't have any initialized data
    return null;
  }

  const { context, item } = player.body;
  // determine where the song came from
  if (!context) {
    // its from <Songs />
    const tracks = queryClient.getQueryData("tracks");
    if (!tracks) {
      return null;
    }

    const trackIndex = tracks.body.items.findIndex(
      ({ track }) => track.id === item.id
    );

    return trackIndex + 1;
  } else {
    // context types are either "artist" "playlist" or "album"
    const { type, uri } = context;

    // uri is now a spotify context uri with signature like
    // spotify:album:D1GJK94ABW26ZVWVI6
    const listId = uri.split(":")[2];

    // get list from cache
    const list = queryClient.getQueryData([type, listId]);
    if (!list) {
      // there will be no list available if the user plays straight from artists
      // TODO: fetch appropriate list
      return null;
    }

    const items = get(list, "body.tracks.items");

    // each context type is a little different to get to the track position
    let trackIndex;
    if (type === "album") {
      trackIndex = items.findIndex(({ id }) => id === item.id);
    } else if (type === "playlist") {
      trackIndex = items.findIndex(({ track }) => track.id === item.id);
    } else {
      trackIndex = -1;
    }

    return trackIndex + 1;
  }
}

export { useCurrentTrackNumber };
