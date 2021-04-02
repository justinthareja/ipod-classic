import { useUser } from "../context/UserContext";
import { useQueryClient } from "react-query";

function useCurrentTrackNumber() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const player = queryClient.getQueryData("player");
  let trackIndex = -1;

  // only use this if authenticated
  if (!user) {
    return trackIndex;
  }

  // player doesn't have any initialized data
  if (!(player && player.body)) {
    return trackIndex;
  }

  const { context, item } = player.body;

  // use spotify context of currenly playing song to determine
  // what track number is playing
  if (!context) {
    // there is no spotify context, so it's a list of songs.
    // assume its from our most recently cached list of tracks
    const tracks = queryClient.getQueryData("tracks");
    if (!tracks) {
      // ???
      return trackIndex;
    }

    trackIndex = tracks.body.items.findIndex(
      ({ track }) => track.id === item.id
    );
  } else {
    // context types are either "artist" "playlist" or "album"
    const { type, uri } = context;

    if (type === "album") {
      const albumId = uri.split(":")[2];
      const album = queryClient.getQueryData([type, albumId]);
      if (!album) {
        // there will be no list available if the user plays straight from an album
        // TODO: fetch appropriate list
        return trackIndex;
      }

      const tracks = album.body.tracks.items;
      trackIndex = tracks.findIndex(({ id }) => id === item.id);
    } else if (type === "playlist") {
      const playlistId = uri.split(":")[2];
      const playlist = queryClient.getQueryData([type, playlistId]);
      if (!playlist) {
        // there will be no list available if the user plays straight from a playlist
        // TODO: fetch appropriate list
        return trackIndex;
      }

      const tracks = playlist.body.tracks.items;
      trackIndex = tracks.findIndex(({ track }) => track.id === item.id);
    } else if (type === "artist") {
      // TODO: how does artist context work?
    }
  }

  return trackIndex + 1;
}

export { useCurrentTrackNumber };
