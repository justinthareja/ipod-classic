import { useQueryClient } from "react-query";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePlaylistById, useAlbumById } from "../hooks";

function useTotalTracks(props) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const player = queryClient.getQueryData("player");

  const [playlistId, setPlaylistId] = useState(null);
  const playlist = usePlaylistById(playlistId);

  const [albumId, setAlbumId] = useState(null);
  const album = useAlbumById(albumId);

  // un-authenticated placeholder
  if (!user) {
    return 12;
  }

  if (!(player && player.body)) {
    return 0;
  }

  const { context } = player.body;

  if (!context) {
    const tracks = queryClient.getQueryData("tracks");
    if (!tracks) {
      // This will be when spotify auto plays.
      return 0;
    }

    return tracks.body.items.length;
  } else {
    const { type, uri } = context;

    if (type === "playlist") {
      const listId = uri.split(":")[2];
      const list = queryClient.getQueryData([type, listId]);
      if (!list) {
        if (!playlist.isFetching && !playlist.isLoading) {
          setPlaylistId(listId);
        }

        return 0;
      }

      return list.body.tracks.total;
    } else if (type === "album") {
      const listId = uri.split(":")[2];
      const list = queryClient.getQueryData([type, listId]);
      if (!list) {
        if (!album.isFetching && !album.isLoading) {
          setAlbumId(listId);
        }

        return 0;
      }

      return list.body.tracks.total;
    } else if (type === "artist") {
      // TODO
      return 0;
    }
  }

  return 0;
}

export { useTotalTracks };
