import { useState } from "react";
import { useQueryClient } from "react-query";
import { useUser } from "../context/UserContext";
import { usePlaylistById, useAlbumById } from "../hooks";

function useCurrentTrackNumber() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const player = queryClient.getQueryData("player");

  const [playlistId, setPlaylistId] = useState(null);
  const playlist = usePlaylistById(playlistId);

  const [albumId, setAlbumId] = useState(null);
  const album = useAlbumById(albumId);

  // only use this if authenticated
  if (!user) {
    return -1;
  }

  // player doesn't have any initialized data
  if (!(player && player.body)) {
    return -1;
  }

  const { context, item } = player.body;

  // use spotify context of currenly playing song to determine
  // what track number is playing
  if (!context) {
    // there is no spotify context, so it's a list of songs.
    // assume its from our most recently cached list of tracks
    const tracks = queryClient.getQueryData("tracks");
    if (!tracks) {
      // This will be when spotify autoplay kicks in
      return -1;
    }

    const trackIndex = tracks.body.items.findIndex(
      ({ track }) => track.id === item.id
    );

    return trackIndex + 1;
  } else {
    // context types are either "artist" "playlist" or "album"
    // a spotify context uri looks like `spotify:{contextType}:{id}`
    const { type, uri } = context;

    if (type === "album") {
      const listId = uri.split(":")[2];
      const list = queryClient.getQueryData([type, listId]);

      // there will be no list available if the user plays straight from an album
      // fetch the album details if this is the case
      if (!list) {
        if (!album.isFetching && !album.isLoading) {
          setAlbumId(listId);
        }
        return -1;
      }

      const trackIndex = list.body.tracks.items.findIndex(
        ({ id }) => id === item.id
      );
      return trackIndex + 1;
    } else if (type === "playlist") {
      const listId = uri.split(":")[2];
      const list = queryClient.getQueryData([type, listId]);

      // there will be no list available if the user plays straight from playlist
      // in this case fetch the album details
      if (!list) {
        if (!playlist.isFetching & !playlist.isLoading) {
          setPlaylistId(listId);
        }

        return -1;
      }

      const trackIndex = list.body.tracks.items.findIndex(
        ({ track }) => track.id === item.id
      );
      return trackIndex + 1;
    } else if (type === "artist") {
      // TODO: how does artist context work?
    }
  }

  return -1;
}

export { useCurrentTrackNumber };
